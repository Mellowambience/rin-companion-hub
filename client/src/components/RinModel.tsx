import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { VRM, VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';
import { useSanctuary } from '../contexts/SanctuaryContext';

interface RinModelProps {
  // Props are now largely managed via useSanctuary
}

function RinModelContent() {
  const { breath, somaticState } = useSanctuary();
  const [vrm, setVrm] = useState<VRM | null>(null);
  const { camera } = useThree();

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser as any) as any);

    loader.load(
      '/Rin_.vrm',
      (gltf) => {
        const vrmModel = gltf.userData.vrm as VRM;
        
        // Remove unnecessary mesh parts if needed or rotate
        VRMUtils.rotateVRM0(vrmModel); // Ensure correct orientation for VRM0
        
        vrmModel.scene.traverse((obj) => {
          obj.frustumCulled = false; // Prevent flickering
        });

        setVrm(vrmModel);
      },
      undefined,
      (error) => console.error('Error loading VRM:', error)
    );
  }, []);

  useFrame((state, delta) => {
    if (vrm) {
      vrm.update(delta);

      // --- Natural Idle Pose (Arms down) ---
      const leftUpperArm = vrm.humanoid?.getRawBoneNode('leftUpperArm');
      const rightUpperArm = vrm.humanoid?.getRawBoneNode('rightUpperArm');
      const leftLowerArm = vrm.humanoid?.getRawBoneNode('leftLowerArm');
      const rightLowerArm = vrm.humanoid?.getRawBoneNode('rightLowerArm');
      
      if (leftUpperArm && rightUpperArm) {
        // Significantly lower arms to sides (z-axis in THREE.js for VRM humanoid)
        leftUpperArm.rotation.z = -1.45; 
        rightUpperArm.rotation.z = 1.45;
        // Slightly rotate shoulders forward
        leftUpperArm.rotation.x = 0.1;
        rightUpperArm.rotation.x = 0.1;

        if (leftLowerArm && rightLowerArm) {
          leftLowerArm.rotation.y = 0.4;
          rightLowerArm.rotation.y = -0.4;
        }
      }

      // --- Head Sway ---
      const head = vrm.humanoid?.getRawBoneNode('head');
      if (head) {
        head.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        head.rotation.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
      }

      // --- Somatic Breathing Animation ---
      // Apply to Spine and Chest bones for natural movement
      const spine = vrm.humanoid?.getRawBoneNode('spine');
      const chest = vrm.humanoid?.getRawBoneNode('chest');
      
      if (spine && chest) {
        // Base breath amount varies by state
        const intensity = somaticState === 'calm' ? 0.02 : 0.04;
        
        // Smooth sine wave based on the 4-4-6-2 cycle progress
        const breathValue = Math.sin(breath.totalProgress * Math.PI * 2);
        
        spine.rotation.x = breathValue * intensity;
        chest.rotation.x = breathValue * intensity * 0.5;
      }

      // --- Blink Logic ---
      const blinkIntensity = Math.max(0, Math.sin(state.clock.elapsedTime * 2) > 0.98 ? 1 : 0);
      vrm.expressionManager?.setValue('blink', blinkIntensity);

      // --- State-based Expressions ---
      if (somaticState === 'calm') {
        vrm.expressionManager?.setValue('relaxed', 0.5);
        vrm.expressionManager?.setValue('neutral', 0.5);
      } else if (somaticState === 'activated') {
        vrm.expressionManager?.setValue('surprised', 0.2);
        vrm.expressionManager?.setValue('neutral', 0.8);
      }
    }
  });

  return (
    <group>
      {vrm && <primitive object={vrm.scene} />}
      <ambientLight intensity={1.2} color={0xfdf8f3} />
      <directionalLight position={[3, 5, 5]} intensity={1.5} color={0xfffcf5} castShadow />
      <pointLight position={[-3, 2, 2]} intensity={0.8} color={0xe8e0f0} />
      <pointLight position={[0, -2, 2]} intensity={0.5} color={0xe8b4b8} />
    </group>
  );
}

export function RinModel() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 1.4, 1.2], fov: 35 }}
        style={{ perspective: '1000px' }}
        gl={{ antialias: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 1.4, 1.5]} fov={35} />
        <RinModelContent />
      </Canvas>
    </div>
  );
}

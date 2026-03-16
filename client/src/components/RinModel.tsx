import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';

interface RinModelProps {
  breathingPhase?: number;
  state?: 'calm' | 'activated' | 'overwhelmed' | 'default';
  isStreaming?: boolean;
}

function RinModelContent({ breathingPhase = 0, state = 'default' }: RinModelProps) {
  const sceneRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    // Load VRM model as a generic glTF
    const loader = new GLTFLoader();
    
    loader.load(
      '/Rin_.vrm',
      (gltf: any) => {
        const model = gltf.scene;
        model.scale.set(1.2, 1.2, 1.2);
        model.position.set(0, -0.5, 0);
        
        // Traverse and set up materials for soft lighting
        model.traverse((node: any) => {
          if (node instanceof THREE.Mesh) {
            node.castShadow = true;
            node.receiveShadow = true;
            if (node.material instanceof THREE.Material) {
              node.material.side = THREE.FrontSide;
            }
          }
        });
        
        if (sceneRef.current) {
          sceneRef.current.add(model);
        }
        modelRef.current = model;
      },
      undefined,
      (error: any) => {
        console.error('Error loading Rin model:', error);
      }
    );
  }, []);

  useFrame(() => {
    if (modelRef.current && sceneRef.current) {
      // Breathing animation
      const breathAmount = Math.sin(breathingPhase * Math.PI * 2) * 0.03;
      modelRef.current.position.y = -0.5 + breathAmount;

      // State-based animations
      switch (state) {
        case 'calm':
          sceneRef.current.rotation.z = Math.sin(Date.now() * 0.0005) * 0.015;
          break;
        case 'activated':
          sceneRef.current.rotation.z = 0;
          break;
        case 'overwhelmed':
          sceneRef.current.rotation.z = 0;
          break;
      }
    }
  });

  return (
    <group ref={sceneRef}>
      <ambientLight intensity={0.85} color={0xfdf8f3} />
      <directionalLight position={[3, 4, 3]} intensity={0.7} color={0xd4af8f} castShadow />
      <pointLight position={[-2, 2, 2]} intensity={0.4} color={0xe8e0f0} />
      <pointLight position={[0, -1, 1]} intensity={0.2} color={0xe8b4b8} />
    </group>
  );
}

export function RinModel({ breathingPhase = 0, state = 'default', isStreaming = false }: RinModelProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 2.5], fov: 45 }}
      style={{
        width: '100%',
        height: '100%',
        background: 'transparent',
      }}
      gl={{
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0.2, 2.5]} fov={45} />
      <RinModelContent breathingPhase={breathingPhase} state={state} isStreaming={isStreaming} />
    </Canvas>
  );
}

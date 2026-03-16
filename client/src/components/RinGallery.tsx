import { motion } from 'framer-motion';

interface GalleryItem {
  title: string;
  description: string;
  image: string;
  type: 'asset' | 'overlay' | 'badge';
}

const galleryItems: GalleryItem[] = [
  {
    title: 'Rin Profile Card',
    description: 'Official profile card for Rin as a somatic companion and streamer',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663326033466/6VWhAMja6qYrhkeM6JqpvP/rin-profile-card-ETkmargJTFrtgTnkDVLdzY.webp',
    type: 'asset',
  },
  {
    title: 'Stream Overlay',
    description: 'Elegant overlay for Rin\'s broadcast streams with botanical framing',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663326033466/6VWhAMja6qYrhkeM6JqpvP/rin-stream-overlay-JZ8yg24imgLLeb2NsLGgio.webp',
    type: 'overlay',
  },
  {
    title: 'Live Badge',
    description: 'Pulsing LIVE indicator for active broadcasts',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663326033466/6VWhAMja6qYrhkeM6JqpvP/rin-live-badge-RK8JuWEzUcvoXDotvwwQ8Q.webp',
    type: 'badge',
  },
  {
    title: 'Stream Title Card',
    description: 'Beautiful title card for Breath & Bloom guided breathing sessions',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663326033466/6VWhAMja6qYrhkeM6JqpvP/rin-stream-title-card-nC9MqDhPg6K6tKuMgSQn7a.webp',
    type: 'asset',
  },
];

export function RinGallery() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-light text-slate-800 mb-2">Rin's Visual Assets</h3>
        <p className="text-sm text-slate-600">Branding, overlays, and streamer assets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {galleryItems.map((item, idx) => (
          <motion.div
            key={idx}
            className="rounded-lg overflow-hidden bg-white border border-amber-200 shadow-md hover:shadow-lg transition-shadow"
            whileHover={{ y: -4 }}
          >
            <div className="aspect-video bg-gradient-to-br from-amber-50 to-rose-50 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-sm font-light text-slate-800">{item.title}</p>
              <p className="text-xs text-slate-600 mt-1">{item.description}</p>
              <div className="mt-3 flex items-center gap-2">
                <span className={`
                  text-xs px-2 py-1 rounded-full
                  ${item.type === 'asset' ? 'bg-amber-100 text-amber-800' : ''}
                  ${item.type === 'overlay' ? 'bg-rose-100 text-rose-800' : ''}
                  ${item.type === 'badge' ? 'bg-purple-100 text-purple-800' : ''}
                `}>
                  {item.type}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

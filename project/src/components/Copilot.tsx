import { X } from 'lucide-react';

const styles = {
  card: 'w-40 h-48 bg-[#1e2a3a] rounded-xl flex flex-col items-center justify-end overflow-hidden shadow-lg',
};

function Copilot() {
  const cards = [
    { label: '3D', img: '/copilot/3d.jpg' },
    { label: 'Photorealistic', img: '/copilot/photo.jpg' },
    { label: 'Watercolor', img: '/copilot/watercolor.jpg' },
    { label: 'Anime', img: '/copilot/anime.jpg' },
  ];

  return (
    <div className="h-full w-full flex flex-col bg-[#0f172a] text-white">
      <div className="h-10 flex items-center justify-between px-4 border-b border-white/10">
        <span className="font-semibold">Copilot</span>
        <X className="w-4 h-4 cursor-pointer" onClick={() => window.close()} />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-8 p-6 overflow-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Good afternoon, User</h1>
          <p className="text-lg text-white/80">What can I help you with today?</p>
        </div>
        <div className="flex gap-6 flex-wrap justify-center">
          {cards.map(c => (
            <div key={c.label} className={styles.card} style={{ backgroundImage: `url(${c.img})`, backgroundSize: 'cover' }}>
              <div className="w-full py-2 bg-white/10 text-center text-sm font-medium">{c.label}</div>
            </div>
          ))}
        </div>
        <div className="w-full max-w-xl mt-10">
          <input
            placeholder="Ask anything"
            className="w-full bg-white/10 backdrop-blur px-4 py-3 rounded-full text-sm focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

export default Copilot;

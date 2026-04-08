import Link from 'next/link';

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] -z-10" />

      <div className="glass-card p-10 w-full max-w-md mx-4 mt-20 relative z-10 border border-white/10 shadow-[0_0_50px_rgba(14,165,233,0.2)]">
        <h2 className="text-3xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">Join DevMeet</h2>
        <p className="text-white/50 mb-8 text-sm">Create your builder profile in seconds.</p>

        <form className="flex flex-col gap-5">
          <div>
            <label className="text-xs font-semibold text-white/70 uppercase">Full Name</label>
            <input 
              type="text" 
              className="mt-1 w-full bg-surface border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-accent/50 transition-colors"
              placeholder="Satoshi Nakamoto"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-white/70 uppercase">Email</label>
            <input 
              type="email" 
              className="mt-1 w-full bg-surface border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-accent/50 transition-colors"
              placeholder="satoshi@bitcoin.org"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-white/70 uppercase">Initial Role</label>
            <select className="mt-1 w-full bg-surface border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-accent/50 transition-colors [&>option]:bg-[#0a0a0f]">
              <option>Frontend Engineeer</option>
              <option>Backend Engineer</option>
              <option>Fullstack Engineer</option>
              <option>UI/UX Designer</option>
              <option>AI/ML Researcher</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-white/70 uppercase">Password</label>
            <input 
              type="password" 
              className="mt-1 w-full bg-surface border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-accent/50 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button className="w-full py-3 rounded-lg text-sm font-bold bg-white text-black hover:bg-white/90 transition-all mt-4 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            Start Building
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-white/50">
          Already a member? <Link href="/login" className="text-accent font-semibold hover:underline">Sign In</Link>
        </div>
      </div>
    </div>
  );
}

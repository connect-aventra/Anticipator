'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                }
            });
        }, observerOptions);

        document.querySelectorAll('section > div').forEach(el => {
            el.classList.add('opacity-0');
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        try {
            const res = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setMessage('Thanks for joining! We\'ll be in touch soon.');
                setEmail(''); // Clear email on success
            } else {
                setStatus('error');
                setMessage(data.message || data.error || 'Something went wrong.');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Failed to submit. Please try again.');
        }
    };

    return (
        <>
            <div className="noise"></div>

            {/* Fixed Navigation */}
            <nav className={`fixed top-0 left-0 w-full z-40 px-6 md:px-8 flex justify-between items-center text-white transition-all duration-300 ${isScrolled ? 'py-4 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5 shadow-sm' : 'py-6 bg-transparent'}`}>
                <div className="flex items-center space-x-3">
                    <img src="/icon.svg" alt="Anticipator Logo" className="w-8 h-8 invert" />
                    <span className="font-black text-xl tracking-tighter uppercase relative text-brand-cream">
                        Anticipator
                    </span>
                </div>
                <div className="hidden md:flex space-x-12 text-sm font-medium tracking-widest uppercase">
                    <a href="#" className="bg-black text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-primary hover:text-white transition-all">Join Waitlist</a>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="min-h-screen flex flex-col justify-center items-center px-6 pt-20">
                <div className="max-w-5xl text-center">
                    <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-8 reveal" style={{ animationDelay: '0.1s' }}>Beta Access Now Open</span>

                    <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-[0.9] text-brand-cream mb-10 reveal" style={{ animationDelay: '0.2s' }}>
                        STOP UNCONTROLLED AI SPEND.
                    </h1>

                    <p className="text-base md:text-xl text-brand-cream/60 max-w-2xl mx-auto mb-12 reveal leading-relaxed" style={{ animationDelay: '0.3s' }}>
                        Anticipator enforces cost guardrails for your LLM stack. <br />
                        We prevent waste before it hits your bill. <br />
                        No dashboards. No surprises. Just controlled spend. <br />
                    </p>

                    {status === 'success' ? (
                        <div className="text-green-600 font-bold text-xl reveal p-4 bg-green-50 rounded-xl border border-green-100" style={{ animationDelay: '0.4s' }}>
                            {message}
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center justify-center gap-2 max-w-lg mx-auto reveal" style={{ animationDelay: '0.4s' }}>
                            <div className="w-full relative">
                                <input
                                    className="w-full px-6 py-4 bg-zinc-900 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-lg transition-all disabled:opacity-50 text-white placeholder:text-zinc-500"
                                    placeholder="Enter your work email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={status === 'loading'}
                                    required
                                />
                                {status === 'error' && (
                                    <div className="absolute -bottom-6 left-0 text-red-500 text-xs font-bold w-full text-left pl-2">
                                        {message}
                                    </div>
                                )}
                            </div>
                            <button
                                className="w-full md:w-auto whitespace-nowrap px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all text-lg shadow-xl shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[200px]"
                                type="submit"
                                disabled={status === 'loading'}
                            >
                                {status === 'loading' ? (
                                    <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                ) : 'Get Early Access'}
                            </button>
                        </form>
                    )}

                    <p className="mt-8 text-xs text-brand-cream/40 uppercase tracking-widest font-semibold reveal" style={{ animationDelay: '0.5s' }}>No credit card required • limited spots weekly</p>
                </div>
            </section>

            {/* Clarity Section */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-8 text-brand-cream">Financial guardrails for LLM apps.</h2>
                        <p className="text-lg text-brand-cream/70 mb-8 leading-relaxed">
                            Most teams only track AI spend after it happens. <br />
                            Anticipator prevents unnecessary model usage, enforces budgets, <br />
                            and stops runaway costs in real time. <br />
                        </p>
                        <ul className="space-y-6">
                            <li className="flex items-start">
                                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-4 mt-1"><i className="material-icons text-sm">check</i></span>
                                <span className="font-bold">Smart model routing</span>
                            </li>
                            <li className="flex items-start">
                                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-4 mt-1"><i className="material-icons text-sm">check</i></span>
                                <span className="font-bold">Circuit breakers & cost ceilings</span>
                            </li>
                            <li className="flex items-start">
                                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-4 mt-1"><i className="material-icons text-sm">check</i></span>
                                <span className="font-bold">Budget enforcement with hard stops</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-brand-black rounded-xl p-1 terminal-glow">
                        <div className="bg-zinc-900 rounded-lg p-6 font-mono text-sm overflow-hidden">
                            <div className="flex space-x-2 mb-6">
                                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-zinc-500">// Processing incoming request...</p>
                                <p className="text-zinc-300"><span className="text-primary">async function</span> <span className="text-blue-400">routeRequest</span>(payload) {'{'}</p>
                                <p className="text-zinc-300 pl-4">const complexity = <span className="text-primary">await</span> analyzer.<span className="text-blue-400">score</span>(payload);</p>
                                <p className="text-zinc-300 pl-4">const threshold = <span className="text-green-400">0.72</span>;</p>
                                <p className="text-zinc-300 pl-4"><span className="text-primary">if</span> (complexity &lt; threshold) {'{'}</p>
                                <p className="text-zinc-300 pl-8 text-primary/80">// Routing to optimized model...</p>
                                <p className="text-zinc-300 pl-8"><span className="text-primary">return await</span> models.<span className="text-blue-400">claude_haiku</span>(payload);</p>
                                <p className="text-zinc-300 pl-4">{'}'} <span className="text-primary">else</span> {'{'}</p>
                                <p className="text-zinc-300 pl-8"><span className="text-primary">return await</span> models.<span className="text-blue-400">gpt_4o</span>(payload);</p>
                                <p className="text-zinc-300 pl-4">{'}'}</p>
                                <p className="text-zinc-300">{'}'}</p>
                                <p className="text-zinc-500 mt-6">// Result: Overspend prevented</p>
                                <div className="h-4 w-1 bg-primary animate-pulse inline-block"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Row */}
            <section className="bg-zinc-900/50 text-brand-cream py-24 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
                    <div className="group cursor-default">
                        <div className="text-7xl font-black mb-2 tracking-tighter transition-all group-hover:text-primary">99.9%</div>
                        <div className="h-1 w-12 bg-primary transition-all group-hover:w-full"></div>
                        <div className="mt-6 text-zinc-400 uppercase tracking-widest font-bold text-sm">Historical Uptime</div>
                    </div>
                    <div className="group cursor-default">
                        <div className="text-7xl font-black mb-2 tracking-tighter transition-all group-hover:text-primary">40%</div>
                        <div className="h-1 w-12 bg-primary transition-all group-hover:w-full"></div>
                        <div className="mt-6 text-zinc-400 uppercase tracking-widest font-bold text-sm">Waste Prevented</div>
                    </div>
                    <div className="group cursor-default">
                        <div className="text-7xl font-black mb-2 tracking-tighter transition-all group-hover:text-primary">20ms</div>
                        <div className="h-1 w-12 bg-primary transition-all group-hover:w-full"></div>
                        <div className="mt-6 text-zinc-400 uppercase tracking-widest font-bold text-sm">Routing Latency</div>
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary mb-16 text-center">Three steps to efficiency</h2>
                    <div className="grid md:grid-cols-3 border-t border-white/10">
                        <div className="p-12 border-b md:border-b-0 md:border-r border-white/10 hover:bg-white/5 transition-colors group">
                            <span className="text-4xl font-black text-white/10 group-hover:text-primary/20 transition-colors">01</span>
                            <h3 className="text-2xl font-bold mt-8 mb-4">Connect API</h3>
                            <p className="text-brand-cream/60">Swap your endpoint. No refactor required.</p>
                        </div>
                        <div className="p-12 border-b md:border-b-0 md:border-r border-white/10 hover:bg-white/5 transition-colors group">
                            <span className="text-4xl font-black text-white/10 group-hover:text-primary/20 transition-colors">02</span>
                            <h3 className="text-2xl font-bold mt-8 mb-4">Define Guardrails</h3>
                            <p className="text-brand-cream/60">Set budgets, ceilings, and quality thresholds.</p>
                        </div>
                        <div className="p-12 hover:bg-white/5 transition-colors group">
                            <span className="text-4xl font-black text-white/10 group-hover:text-primary/20 transition-colors">03</span>
                            <h3 className="text-2xl font-bold mt-8 mb-4">Prevent Overspend</h3>
                            <p className="text-brand-cream/60">Requests are routed and enforced automatically.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative py-48 px-6 overflow-hidden flex items-center justify-center bg-black">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                    <span className="text-[15vw] font-black text-white/5 uppercase leading-none tracking-tighter">Anticipator</span>
                </div>
                <div className="relative z-10 text-center max-w-2xl">
                    <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 text-brand-cream">Ready to optimize?</h2>
                    <p className="text-xl text-brand-cream/60 mb-12">Join teams replacing monitoring with enforcement.</p>
                    {status === 'success' ? (
                        <div className="text-green-600 font-bold text-xl p-4 bg-green-50 rounded-xl border border-green-100">
                            {message}
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center justify-center gap-2">
                            <div className="w-full relative">
                                <input
                                    className="w-full px-6 py-4 bg-zinc-900 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-lg transition-all disabled:opacity-50 text-white placeholder:text-zinc-500"
                                    placeholder="Enter your work email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={status === 'loading'}
                                    required
                                />
                                {status === 'error' && (
                                    <div className="absolute -bottom-6 left-0 text-red-500 text-xs font-bold w-full text-left pl-2">
                                        {message}
                                    </div>
                                )}
                            </div>
                            <button
                                className="w-full md:w-auto whitespace-nowrap px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all text-lg shadow-xl shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[200px]"
                                type="submit"
                                disabled={status === 'loading'}
                            >
                                {status === 'loading' ? (
                                    <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                ) : 'Join Waitlist'}
                            </button>
                        </form>
                    )}
                    <p className="mt-6 text-sm font-medium text-brand-cream/40">Integrating with GPT, Claude, Mistral, and more.</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-white/5 px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm font-medium text-brand-cream/40">
                    <div className="flex items-center space-x-2 mb-4 md:mb-0">
                        <img src="/icon.svg" alt="Anticipator Logo" className="w-5 h-5 invert" />
                        <span className="font-black tracking-tighter text-brand-cream uppercase">Anticipator</span>
                        <span>© 2026</span>
                    </div>
                    <div className="flex space-x-8 uppercase tracking-widest text-[10px]">
                        <a href="#" className="hover:text-brand-cream transition-colors">Twitter</a>
                        <a href="#" className="hover:text-brand-cream transition-colors">Youtube</a>
                        <a href="#" className="hover:text-brand-cream transition-colors">Linkden</a>
                    </div>
                </div>
            </footer>
        </>
    );
}

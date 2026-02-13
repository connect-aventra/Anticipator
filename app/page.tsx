'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <>
            <div className="noise"></div>

            {/* Fixed Navigation */}
            <nav className="fixed top-0 left-0 w-full z-40 px-8 py-6 flex justify-between items-center mix-blend-difference text-white">
                <div className="flex items-center space-x-2">
                    <span className="font-black text-xl tracking-tighter uppercase">Anticipator AI</span>
                    <div className="w-2 h-2 rounded-full bg-primary pulse ml-2"></div>
                </div>
                <div className="hidden md:flex space-x-12 text-sm font-medium tracking-widest uppercase">
    
                    <a href="#" className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-bold hover:bg-primary hover:text-white transition-all">Join Waitlist</a>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="min-h-screen flex flex-col justify-center items-center px-6 pt-20">
                <div className="max-w-5xl text-center">
                    <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-8 reveal" style={{ animationDelay: '0.1s' }}>Beta Access Now Open</span>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-brand-black mb-10 reveal" style={{ animationDelay: '0.2s' }}>
                        STOP UNCONTROLLED AI SPEND.
                    </h1>

                    <p className="text-xl md:text-xl text-brand-black/60 max-w-2xl mx-auto mb-12 reveal" style={{ animationDelay: '0.3s' }}>
                        Anticipator enforces cost guardrails for your LLM stack. <br />
                        We prevent waste before it hits your bill. <br />
                        No dashboards. No surprises. Just controlled spend. <br />
                    </p>

                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center justify-center gap-2 max-w-lg mx-auto reveal" style={{ animationDelay: '0.4s' }}>
                            <input
                                className="w-full px-6 py-4 bg-white border border-brand-black/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-lg transition-all"
                                placeholder="Enter your work email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button className="w-full md:w-auto whitespace-nowrap px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all text-lg shadow-xl shadow-primary/20" type="submit">
                                Get Early Access
                            </button>
                        </form>
                    ) : (
                        <div className="text-green-600 font-bold text-xl reveal" style={{ animationDelay: '0.4s' }}>
                            Thanks for joining! We'll be in touch soon.
                        </div>
                    )}

                    <p className="mt-4 text-xs text-brand-black/40 uppercase tracking-widest font-semibold reveal" style={{ animationDelay: '0.5s' }}>No credit card required • limited spots weekly</p>
                </div>
            </section>

            {/* Ticker */}
            <div className="ticker-wrap bg-brand-black text-brand-cream py-6">
                <div className="ticker">
                    <div className="inline-block px-12 text-2xl font-black italic tracking-widest">SMART ROUTING • BUDGET ENFORCEMENT • CIRCUIT BREAKERS • SHADOW SAVINGS • NO BILL SURPRISES • FINANCIAL GUARDRAILS FOR LLMs • SMART ROUTING • BUDGET ENFORCEMENT • CIRCUIT BREAKERS • SHADOW SAVINGS • NO BILL SURPRISES • FINANCIAL GUARDRAILS FOR LLMs • SMART ROUTING • BUDGET ENFORCEMENT • CIRCUIT BREAKERS • SHADOW SAVINGS • NO BILL SURPRISES • FINANCIAL GUARDRAILS FOR LLMs </div>
                </div>
            </div>

            {/* Clarity Section */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-8">Financial guardrails for LLM apps.</h2>
                        <p className="text-lg text-brand-black/70 mb-8 leading-relaxed">
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
            <section className="bg-brand-black text-brand-cream py-24">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
                    <div className="group cursor-default">
                        <div className="text-7xl font-black mb-2 tracking-tighter transition-all group-hover:text-primary">99.9%</div>
                        <div className="h-1 w-12 bg-primary transition-all group-hover:w-full"></div>
                        <div className="mt-6 text-zinc-400 uppercase tracking-widest font-bold text-sm">Historical Uptime</div>
                    </div>
                    <div className="group cursor-default">
                        <div className="text-7xl font-black mb-2 tracking-tighter transition-all group-hover:text-primary">50%</div>
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
                    <div className="grid md:grid-cols-3 border-t border-brand-black/10">
                        <div className="p-12 border-b md:border-b-0 md:border-r border-brand-black/10 hover:bg-white transition-colors group">
                            <span className="text-4xl font-black text-brand-black/10 group-hover:text-primary/20 transition-colors">01</span>
                            <h3 className="text-2xl font-bold mt-8 mb-4">Connect API</h3>
                            <p className="text-brand-black/60">Swap your endpoint. No refactor required.</p>
                        </div>
                        <div className="p-12 border-b md:border-b-0 md:border-r border-brand-black/10 hover:bg-white transition-colors group">
                            <span className="text-4xl font-black text-brand-black/10 group-hover:text-primary/20 transition-colors">02</span>
                            <h3 className="text-2xl font-bold mt-8 mb-4">Define Guardrails</h3>
                            <p className="text-brand-black/60">Set budgets, ceilings, and quality thresholds.</p>
                        </div>
                        <div className="p-12 hover:bg-white transition-colors group">
                            <span className="text-4xl font-black text-brand-black/10 group-hover:text-primary/20 transition-colors">03</span>
                            <h3 className="text-2xl font-bold mt-8 mb-4">Prevent Overspend</h3>
                            <p className="text-brand-black/60">Requests are routed and enforced automatically.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative py-48 px-6 overflow-hidden flex items-center justify-center bg-brand-cream">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                    <span className="text-[15vw] font-black text-brand-black/5 uppercase leading-none tracking-tighter">Anticipator</span>
                </div>
                <div className="relative z-10 text-center max-w-2xl">
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">Ready to optimize?</h2>
                    <p className="text-xl text-brand-black/60 mb-12">Join teams replacing monitoring with enforcement.</p>
                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center justify-center gap-2">
                            <input
                                className="w-full px-6 py-4 bg-white border border-brand-black/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-lg transition-all"
                                placeholder="Enter your work email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button className="w-full md:w-auto whitespace-nowrap px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all text-lg shadow-xl shadow-primary/20" type="submit">
                                Join Waitlist
                            </button>
                        </form>
                    ) : (
                        <div className="text-green-600 font-bold text-xl">
                            You're on the list!
                        </div>
                    )}
                    <p className="mt-6 text-sm font-medium text-brand-black/40">Integrating with GPT, Claude, Mistral, and more.</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-brand-black/5 px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:row justify-between items-center text-sm font-medium text-brand-black/40">
                    <div className="flex items-center space-x-2 mb-4 md:mb-0">
                        <span className="font-black tracking-tighter text-brand-black uppercase">Anticipator AI</span>
                        <span>© 2024</span>
                    </div>
                    <div className="flex space-x-8 uppercase tracking-widest text-[10px]">
                        <a href="#" className="hover:text-brand-black transition-colors">Twitter</a>
                        <a href="#" className="hover:text-brand-black transition-colors">GitHub</a>
                        <a href="#" className="hover:text-brand-black transition-colors">Privacy</a>
                        <a href="#" className="hover:text-brand-black transition-colors">Terms</a>
                    </div>
                </div>
            </footer>
        </>
    );
}

import Hero from "@/components/sections/Hero";
import Vision from "@/components/sections/Vision";
import Mission from "@/components/sections/Mission";
import Process from "@/components/sections/Process";
import Works from "@/components/sections/Works";
import Contact from "@/components/sections/Contact";

// CMSデータを常に最新で取得するため動的レンダリング
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#FAFAFA] selection:bg-white/20" style={{ overflowX: 'hidden' }}>
      <div style={{ width: '70%', maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto' }}>
        <Hero />
        <div className="space-y-64 pb-40">
          <Vision />
          <Mission />
          <Process />
          <div style={{ marginTop: '100px' }}>
            <Works />
          </div>
          <div style={{ marginTop: '600px' }}>
            <Contact />
          </div>
        </div>
      </div>
      <footer className="border-t border-white/5 py-8 text-center text-sm text-neutral-500">
        <p>&copy; {new Date().getFullYear()} All Rights Reserved.</p>
      </footer>
    </main>
  );
}

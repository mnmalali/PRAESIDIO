"use client";
import Image from "next/image";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const MotionContext = createContext({
  enabled: true,
  reduced: false,
  toggle: () => {},
});

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(true);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion =
      enabled && !reduced ? "on" : "off";
  }, [enabled, reduced]);
  return (
    <MotionContext.Provider
      value={{
        enabled: enabled && !reduced,
        reduced,
        toggle: () => setEnabled((v) => !v),
      }}
    >
      {children}
    </MotionContext.Provider>
  );
}

export function MotionToggle() {
  const { enabled, reduced, toggle } = useContext(MotionContext);
  return (
    <button
      className="motion-toggle"
      onClick={toggle}
      disabled={reduced}
      aria-label={
        reduced
          ? "Motion disabled by system preference"
          : enabled
            ? "Pause motion"
            : "Enable motion"
      }
      aria-pressed={!enabled}
      title={
        reduced
          ? "Reduced motion preference respected"
          : enabled
            ? "Pause motion"
            : "Enable motion"
      }
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        {enabled ? (
          <>
            <path d="M8 5v14M16 5v14" stroke="currentColor" strokeWidth="2" />
          </>
        ) : (
          <path d="m8 5 11 7-11 7V5Z" stroke="currentColor" strokeWidth="1.7" />
        )}
      </svg>
    </button>
  );
}

// Native scroll progress drives a path measured from actual content anchors.
export function LogoJourney() {
  const { enabled } = useContext(MotionContext);
  const guide = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLSpanElement>(null);
  const bounds = useRef<DOMRect | null>(null);
  const active = useRef<Animation | null>(null);
  useEffect(() => {
    const Timeline = (window as unknown as {ScrollTimeline?: new (options: {source: Element}) => AnimationTimeline}).ScrollTimeline;
    const media = window.matchMedia("(min-width: 1100px)");
    const guideElement = guide.current;
    let travel: Animation | undefined;
    let disposed = false;
    const build = () => {
      travel?.cancel();
      if (!enabled || !media.matches || !Timeline || !guide.current) return;
      const max = document.documentElement.scrollHeight - innerHeight;
      const rect = (selector: string) => document.querySelector(selector)?.getBoundingClientRect();
      const points: {x:number;y:number;scroll:number;scale:number}[] = [];
      // Every landing is a measured alignment, with a 20px gap from its target.
      const dock = (selector:string, side:"left"|"right"|"top"|"center", size=54) => {
        const r=rect(selector); if(!r)return;
        const x=side==="left" ? r.left-size-20 : side==="right" ? r.right+20 : r.left+(r.width-size)/2;
        const y=side==="top" ? r.top-size-20 : r.top+(r.height-size)/2;
        const docY=y+window.scrollY;
        points.push({x:Math.max(16,Math.min(innerWidth-size-16,x)),y:docY,scroll:Math.max(0,Math.min(max,docY+size/2-innerHeight*.46)),scale:size/180});
      };
      dock("header .brand img","center",32);
      dock(".hero-copy h1","right",100);
      dock(".scenario-picker","left");
      dock(".integrations > p","left",48);
      dock(".launch-film h2","right",48);
      dock(".workflow-section h2","left");
      dock(".feature-switcher","left",48);
      dock(".control-section h2","right");
      dock(".context-feature","top",48);
      dock(".review-feature","top",48);
      dock(".evidence-visual","left",48);
      dock(".self-host h2","left");
      dock(".faq h2","left");
      dock(".closing-mark","center",56);
      // A short dwell makes each arrival readable before the next sweep.
      for(let i=1;i<points.length;i++) points[i].scroll=Math.max(points[i].scroll,points[i-1].scroll+180);
      const last=points.at(-1)!;
      if(last.scroll>max-60) {const ratio=(max-60)/last.scroll;for(const p of points)p.scroll*=ratio;}
      const frames:Keyframe[]=[];
      const frame=(x:number,y:number,scale:number,scroll:number,opacity=1)=>({offset:scroll/max,opacity,transform:`translate3d(${x}px,${y-scroll}px,0) scale(${scale})`});
      frames.push(frame(points[0].x,points[0].y,points[0].scale,0));
      for(let i=0;i<points.length-1;i++) {
        const a=points[i],b=points[i+1];
        const start=a.scroll+(i===0?0:30), end=b.scroll-30;
        frames.push(frame(a.x,a.y,a.scale,start));
        for(let j=1;j<=24;j++) {
          const t=j/24, u=t*t*t*(t*(t*6-15)+10), v=1-u;
          const scroll=start+(end-start)*t;
          // Cubic curves leave and approach targets vertically; no angular zigzags.
          const dy=b.y-a.y;
          const x=v*v*v*a.x+3*v*v*u*a.x+3*v*u*u*b.x+u*u*u*b.x;
          const y=v*v*v*a.y+3*v*v*u*(a.y+dy*.45)+3*v*u*u*(b.y-dy*.45)+u*u*u*b.y;
          const opacity=i===points.length-2 ? 1-u : 1;
          frames.push(frame(x,y,a.scale+(b.scale-a.scale)*u,scroll,opacity));
        }
      }
      frames.push(frame(last.x,last.y,last.scale,max,0));
      travel=guide.current.animate(frames,{timeline:new Timeline({source:document.documentElement}),fill:"both"});
      guide.current.dataset.path="active";
    };
    const resize=new ResizeObserver(build);
    const home=document.querySelector(".home-page");if(home)resize.observe(home);
    media.addEventListener("change",build);
    window.addEventListener("resize",build);
    document.fonts.ready.then(()=>{if(!disposed)build();});
    return()=>{disposed=true;travel?.cancel();active.current?.cancel();resize.disconnect();media.removeEventListener("change",build);window.removeEventListener("resize",build);if(guideElement)delete guideElement.dataset.path;};
  },[enabled]);
  const animate = (frames: Keyframe[], duration: number) => {
    if (!enabled || !image.current) return;
    active.current?.cancel();
    active.current = image.current.animate(frames, {
      duration,
      easing: "cubic-bezier(.22,1,.36,1)",
      fill: "forwards",
    });
  };
  return (
    <div ref={guide} className="logo-journey" aria-hidden="true">
      <button
        className="logo-object"
        tabIndex={-1}
        aria-label="Animate the PRAESIDIO shield"
        disabled={!enabled}
        style={{ pointerEvents: "none" }}
        onPointerEnter={(e) => {
          bounds.current = e.currentTarget.getBoundingClientRect();
        }}
        onPointerMove={(e) => {
          const b = bounds.current;
          if (!b || e.pointerType === "touch") return;
          const x = (e.clientX - b.left) / b.width - 0.5;
          const y = (e.clientY - b.top) / b.height - 0.5;
          animate(
            [
              {
                transform: `perspective(600px) rotateX(${-y * 24}deg) rotateY(${x * 30}deg)`,
              },
            ],
            180,
          );
        }}
        onPointerLeave={() =>
          animate(
            [{ transform: "perspective(600px) rotateX(0) rotateY(0)" }],
            350,
          )
        }
        onClick={() =>
          animate(
            [
              { transform: "translateY(0) rotate(-5deg)" },
              { transform: "translateY(-18px) rotate(12deg)", offset: 0.4 },
              { transform: "translateY(0) rotate(0)" },
            ],
            850,
          )
        }
      >
        <span ref={image}>
          <Image
            src="/praesidio-logo.png"
            alt=""
            width={200}
            height={200}
            priority
            sizes="200px"
          />
        </span>
      </button>

    </div>
  );
}

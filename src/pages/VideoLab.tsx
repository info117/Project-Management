import React, { useState } from 'react';
import { Video, Play, Sparkles, Wand2, ArrowLeft, Loader2, Info, Settings, Music, ChevronDown, Upload, Cloud, CheckCircle } from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, auth } from '../lib/firebase';
import { generateConceptVideo } from '../services/geminiService';
import { cn } from '../lib/utils';

export default function VideoLab() {
  const [concept, setConcept] = useState('');
  const [quality, setQuality] = useState('1080p');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [musicOption, setMusicOption] = useState('none');
  const [exportFormat, setExportFormat] = useState('mp4');
  const [compression, setCompression] = useState('standard');
  const [showSettings, setShowSettings] = useState(false);
  
  const [assetUrl, setAssetUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Persistence & Query Params
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const conceptParam = params.get('concept');
    if (conceptParam) {
      setConcept(decodeURIComponent(conceptParam));
    }

    const saved = localStorage.getItem('pm_video_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.aspectRatio) setAspectRatio(parsed.aspectRatio);
        if (parsed.musicOption) setMusicOption(parsed.musicOption);
        if (parsed.quality) setQuality(parsed.quality);
        if (parsed.exportFormat) setExportFormat(parsed.exportFormat);
        if (parsed.compression) setCompression(parsed.compression);
      } catch (e) {
        console.error("Failed to load settings from localStorage", e);
      }
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('pm_video_settings', JSON.stringify({ aspectRatio, musicOption, quality, exportFormat, compression }));
  }, [aspectRatio, musicOption, quality, exportFormat, compression]);

  const handleGenerate = async () => {
    if (!concept.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    setVideoUrl(null);
    
    try {
      const url = await generateConceptVideo(
        concept, 
        quality, 
        aspectRatio, 
        musicOption, 
        exportFormat, 
        compression, 
        assetUrl || undefined,
        (msg) => setStatus(msg)
      );
      setVideoUrl(url);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during synthesis.");
      if (err.message?.includes("not found")) {
        setError("API Key Selection Required. Please try again.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!auth.currentUser) {
      setError("Please sign in to upload assets.");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const storageRef = ref(storage, `video-assets/${auth.currentUser.uid}/${Date.now()}-${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setAssetUrl(url);
      setStatus("Asset synchronized with cloud storage.");
    } catch (err: any) {
      console.error("Upload Error:", err);
      
      // Fallback to local URL if upload fails (e.g. Storage not initialized or CORS)
      const localUrl = URL.createObjectURL(file);
      setAssetUrl(localUrl);
      
      if (err.code === 'storage/retry-limit-exceeded' || err.message?.includes('network')) {
        setError("Neural link (Storage) timeout. Proceeding with local direct-link fallback. Your video will still generate correctly using this session's asset.");
      } else {
        setError("Asset upload failed: " + err.message + ". Using local fallback.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <Link to="/dashboard" className="flex items-center gap-2 text-stone-500 hover:text-brand transition-colors mb-12 group w-fit">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-black uppercase tracking-widest">Back to Dashboard</span>
      </Link>

      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-12 lg:col-span-5 space-y-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-brand/10 border border-brand/20 rounded-xl">
                <Video size={24} className="text-brand" />
              </div>
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase">
                Video <span className="text-brand">Lab</span>
              </h1>
            </div>
            <p className="text-stone-400 font-medium leading-relaxed">
              Transform abstract Project Management theories into cinematic visual explanations using <span className="text-white font-bold">Veo Intelligence</span>.
            </p>
          </div>

          <div className="glass-card p-8 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12 pointer-events-none">
              <Sparkles size={120} />
            </div>

            <div 
              className="space-y-4"
              data-tooltip-id="videolab-tooltip"
              data-tooltip-content="Enter the Project Management concept or term you want to visualize."
            >
              <label className="text-[10px] font-black text-stone-500 uppercase tracking-[0.3em]">Complexity Input</label>
              <textarea
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                placeholder="e.g. Critical Path Method using Forward and Backward Pass..."
                className="w-full bg-stone-950/50 border border-white/10 rounded-2xl p-4 text-white text-sm focus:border-brand/50 focus:ring-1 focus:ring-brand/20 transition-all min-h-[120px] resize-none"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-stone-500 uppercase tracking-[0.3em]">Visual Reference (Optional)</label>
              <div className="relative">
                <input 
                  type="file" 
                  accept="video/*,image/*" 
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  disabled={isUploading}
                />
                <div className={cn(
                  "p-4 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-3 transition-all",
                  assetUrl 
                    ? "bg-emerald-500/5 border-emerald-500/30" 
                    : "bg-stone-950/50 border-white/5 hover:border-brand/30"
                )}>
                  {isUploading ? (
                    <>
                      <Loader2 size={24} className="text-brand animate-spin" />
                      <p className="text-[9px] font-black text-stone-500 uppercase tracking-widest">Uploading to Neural Vault...</p>
                    </>
                  ) : assetUrl ? (
                    <>
                      <CheckCircle size={24} className="text-emerald-400" />
                      <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Asset Loaded & Verified</p>
                    </>
                  ) : (
                    <>
                      <Cloud size={24} className="text-stone-600" />
                      <div className="text-center">
                        <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1">Click or Drag Asset</p>
                        <p className="text-[8px] text-stone-600 font-bold uppercase tracking-tight">MP4, MOV, or Image (Max 50MB)</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div 
              className="space-y-4"
              data-tooltip-id="videolab-tooltip"
              data-tooltip-content="Neural Fidelity (Resolution) directly impacts the complexity of synthesis. Higher fidelity requires significantly more computational resources and token consumption."
            >
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black text-stone-500 uppercase tracking-[0.3em]">Neural Fidelity</label>
                <div className="flex items-center gap-2">
                   <div className="text-[8px] font-black py-0.5 px-1.5 bg-brand/10 text-brand rounded border border-brand/20 uppercase tracking-widest">
                     {quality === '720p' ? 'Fast / Low Cost' : quality === '1080p' ? 'Standard / Medium Cost' : 'Intensive / High Cost'}
                   </div>
                </div>
              </div>
              
              <div className="px-2 pt-6 pb-2">
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="1"
                  value={quality === '720p' ? 0 : quality === '1080p' ? 1 : 2}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setQuality(val === 0 ? '720p' : val === 1 ? '1080p' : '2160p');
                  }}
                  className="w-full h-1.5 bg-stone-900 rounded-lg appearance-none cursor-pointer accent-brand"
                />
                <div className="flex justify-between mt-4">
                  {[
                    { label: 'SD', sub: '720p' },
                    { label: 'HD', sub: '1080p' },
                    { label: '4K', sub: 'Extreme' },
                  ].map((q, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <span className={cn(
                        "text-[9px] font-black uppercase tracking-widest transition-colors mb-1",
                        ((i === 0 && quality === '720p') || (i === 1 && quality === '1080p') || (i === 2 && quality === '2160p')) 
                          ? "text-brand" 
                          : "text-stone-600"
                      )}>
                        {q.label}
                      </span>
                      <span className="text-[7px] text-stone-700 font-bold uppercase">{q.sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center justify-between w-full p-4 glass rounded-2xl border border-white/5 hover:border-brand/40 transition-all group"
                data-tooltip-id="videolab-tooltip"
                data-tooltip-content="Configure advanced cinematic defaults including frame rate, aspect ratio, and background audio."
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-brand/10 rounded-lg">
                    <Settings size={14} className="text-brand group-hover:rotate-45 transition-transform duration-500" />
                  </div>
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Advanced Parameters</span>
                </div>
                <ChevronDown size={14} className={cn("text-stone-500 transition-transform duration-300", showSettings && "rotate-180")} />
              </button>

              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden space-y-6 px-1"
                  >
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-3">
                        <label className="text-[9px] font-black text-stone-500 uppercase tracking-widest pl-1">Aspect Ratio</label>
                        <select 
                          value={aspectRatio}
                          onChange={(e) => setAspectRatio(e.target.value)}
                          className="w-full bg-stone-950/80 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-bold text-white focus:border-brand transition-all appearance-none"
                        >
                          <option value="16:9">16:9 (Landscape)</option>
                          <option value="9:16">9:16 (Portrait)</option>
                          <option value="1:1">1:1 (Square)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-stone-500 uppercase tracking-widest pl-1 flex items-center gap-2">
                        <Music size={10} className="text-brand" /> Background Audio
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'none', label: 'None' },
                          { id: 'corporate', label: 'Corporate' },
                          { id: 'ambient', label: 'Ambient' },
                          { id: 'inspiring', label: 'Inspiring' },
                        ].map(m => (
                          <button
                            key={m.id}
                            onClick={() => setMusicOption(m.id)}
                            className={cn(
                              "py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all",
                              musicOption === m.id 
                                ? "bg-brand/20 border-brand text-brand" 
                                : "bg-stone-950/30 border-white/5 text-stone-500 hover:text-stone-300"
                            )}
                          >
                            {m.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <label className="text-[9px] font-black text-stone-500 uppercase tracking-widest pl-1">Export Format</label>
                        <select 
                          value={exportFormat}
                          onChange={(e) => setExportFormat(e.target.value)}
                          className="w-full bg-stone-950/80 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-bold text-white focus:border-brand transition-all appearance-none"
                        >
                          <option value="mp4">MP4 (Default)</option>
                          <option value="mov">MOV (Master)</option>
                          <option value="avi">AVI (Legacy)</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] font-black text-stone-500 uppercase tracking-widest pl-1">Compression</label>
                        <select 
                          value={compression}
                          onChange={(e) => setCompression(e.target.value)}
                          className="w-full bg-stone-950/80 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-bold text-white focus:border-brand transition-all appearance-none"
                        >
                          <option value="low">Low (Fast)</option>
                          <option value="standard">Standard</option>
                          <option value="high">High (Lossless)</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !concept.trim()}
              data-tooltip-id="videolab-tooltip"
              data-tooltip-content="Click to begin the multi-stage neural synthesis and video generation process."
              className={cn(
                "w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] transition-all flex items-center justify-center gap-3",
                isGenerating || !concept.trim()
                  ? "bg-stone-800 text-stone-500 cursor-not-allowed"
                  : "bg-brand text-white hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] shadow-xl"
              )}
            >
              {isGenerating ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  {status || "Syncing with Orchestrator..."}
                </>
              ) : videoUrl ? (
                <>
                  <CheckCircle size={16} className="text-white" />
                  Artifact Completed
                </>
              ) : (
                <>
                  <Wand2 size={16} />
                  Visualize Concept
                </>
              )}
            </button>

            <div className="flex items-start gap-3 p-4 bg-orange-500/5 border border-orange-500/10 rounded-xl">
              <Info size={16} className="text-orange-400 mt-0.5 flex-shrink-0" />
              <p className="text-[10px] text-stone-400 leading-relaxed italic">
                Veo video generation is a resource-intensive process. Each synthesis may take 2-3 minutes. Ensure you have a paid Gemini API key configured.
              </p>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl"
            >
              <p className="text-xs text-rose-400 font-medium flex items-center gap-2">
                 Neural link failure: {error}
              </p>
            </motion.div>
          )}
        </div>

        <div className="col-span-12 lg:col-span-7">
          <div className="aspect-video glass-card border-white/5 rounded-3xl overflow-hidden relative flex flex-col items-center justify-center bg-stone-950/50">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center space-y-6 p-12"
                >
                  <div className="relative w-20 h-20 mx-auto">
                    <div className="absolute inset-0 rounded-full border-4 border-brand/10 w-full h-full"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-t-brand w-full h-full animate-spin"></div>
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-brand animate-pulse" size={24} />
                  </div>
                  <div className="space-y-4">
                    <p className="text-lg font-black text-white uppercase tracking-tighter">
                      {status.includes('COMPLETED') ? 'Artifact Ready' : 'Synthesizing'}
                    </p>
                    <p className="text-xs font-bold text-brand uppercase tracking-[0.4em] animate-pulse h-4">{status}</p>
                  </div>
                </motion.div>
              ) : videoUrl ? (
                <motion.div
                  key="video"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full h-full relative"
                >
                  <video
                    src={videoUrl}
                    controls
                    className="w-full h-full object-cover"
                    poster="https://picsum.photos/seed/pmlab/1920/1080?blur=10"
                  />
                  <div className="absolute top-6 left-6 p-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg">
                    <p className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                      Intelligence Verified
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  className="text-center space-y-6 opacity-30 px-12"
                >
                  <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full mx-auto flex items-center justify-center mb-6">
                    <Play size={40} className="text-stone-600 ml-2" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-black text-white uppercase tracking-[0.3em]">Awaiting Input</h3>
                    <p className="text-xs text-stone-500 font-medium">Concept visualizations will manifest here after neural synthesis.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6">
             <div 
               className="p-6 glass border-white/5 rounded-2xl space-y-2"
               data-tooltip-id="videolab-tooltip"
               data-tooltip-content={`Selected output resolution: ${quality}. Impact varies by synthesis engine load.`}
             >
                <p className="text-[9px] font-black text-stone-500 uppercase tracking-widest">Resolution / Fidelity</p>
                <p className="text-lg font-black text-white tracking-tighter">
                  {quality === '720p' && '720P'}
                  {quality === '1080p' && '1080P'}
                  {quality === '2160p' && '4K'}
                  <span className="text-[10px] text-brand ml-2">
                    {quality === '720p' ? 'SD' : quality === '1080p' ? 'HD' : 'UHD'}
                  </span>
                </p>
             </div>
             <div 
               className="p-6 glass border-white/5 rounded-2xl space-y-2"
               data-tooltip-id="videolab-tooltip"
               data-tooltip-content="Advanced temporal and spatial parameters."
             >
                <p className="text-[9px] font-black text-stone-500 uppercase tracking-widest">Spatial Architecture</p>
                <p className="text-lg font-black text-white tracking-tighter">
                  Canvas <span className="text-[10px] text-brand ml-2 uppercase">{aspectRatio}</span>
                </p>
             </div>
          </div>
        </div>
      </div>
      <Tooltip 
        id="videolab-tooltip" 
        style={{ backgroundColor: '#1c140e', color: '#fdfbf7', border: '1px solid #2d241d', padding: '8px 12px', fontSize: '10px', borderRadius: '8px', zIndex: 100 }}
      />
    </div>
  );
}

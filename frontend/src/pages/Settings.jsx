const Settings = () => {
  return (
    <div className="animate-fade-in pb-12">
      <header className="mb-6">
        <h1 className="text-[28px] font-bold text-slate-900 tracking-tight leading-none">Settings</h1>
        <p className="text-slate-500 text-sm mt-1.5 font-medium">Configure system preferences and ML thresholds.</p>
      </header>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-8 min-h-[400px] flex items-center justify-center text-slate-400 font-semibold text-sm">
        System and account settings will be available here.
      </div>
    </div>
  );
};
export default Settings;

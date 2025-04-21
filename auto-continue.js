(function(){
  const COOLDOWN_MS = 2500;
  let lastClick = 0;

  function clickIfFound() {
    const now = Date.now();
    if (now - lastClick < COOLDOWN_MS) return;

    const btn = Array.from(
      document.querySelectorAll('a.monaco-button[role="button"], button.monaco-button')
    ).find(el => /continue/i.test(el.textContent?.trim()));

    if (btn) {
      btn.click();
      lastClick = now;
      console.log('[copilot-auto-continue] Clicked:', btn);
    }
  }

  const intervalId = setInterval(clickIfFound, 1000);
  const observer   = new MutationObserver(clickIfFound);
  observer.observe(document.body, { childList: true, subtree: true });

  window.stopAutoContinue = () => {
    clearInterval(intervalId);
    observer.disconnect();
    console.log('[copilot-auto-continue] stopped.');
  };
})();

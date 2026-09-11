export function getCompileSequence(style) {
  switch (style) {
    case 'drip':
      return [
        { percent: 8,   delay: 400,  label: 'പാഴ്സ് ചെയ്യുന്നു... (മഴ പെയ്യുന്നു) 🌧️' },
        { percent: 22,  delay: 600,  label: 'ഇമ്പോർട്ട്സ് തപ്പുന്നു... (ഇപ്പോഴും മഴ) ☔' },
        { percent: 35,  delay: 500,  label: 'ടൈപ്പ് ചെക്ക് ചെയ്യുന്നു... (വെള്ളം കേറിത്തുടങ്ങി) 💦' },
        { percent: 48,  delay: 800,  label: 'ലിങ്ക് ചെയ്യുന്നു... (ഡ്രെയിൻ അടഞ്ഞു) 🔧' },
        { percent: 61,  delay: 600,  label: 'ഒപ്റ്റിമൈസ് ചെയ്യുന്നു... (പ്രതീക്ഷകൾ അലിയുന്നു) 😭' },
        { percent: 74,  delay: 700,  label: 'ബണ്ടിൽ ചെയ്യുന്നു... (മുഴുവൻ നനഞ്ഞു) 💔' },
        { percent: 87,  delay: 500,  label: 'തീരാറായി... (ഇല്ല വീണ്ടും മഴ) 🌧️' },
        { percent: 100, delay: 400,  label: 'കഴിഞ്ഞു. (എന്ന് തോന്നുന്നു.) 😔' },
      ];
    case 'sunbeam':
      return [
        { percent: 15,  delay: 300,  label: 'കമ്പൈലിംഗ് വിത്ത് കോൺഫിഡൻസ് 🔥' },
        { percent: 35,  delay: 250,  label: 'സിന്റാക്സ് എറർ പുല്ലാണ് ☀️' },
        { percent: 55,  delay: 200,  label: 'പ്രകാശവേഗത്തിൽ ലിങ്ക് ചെയ്യുന്നു ⚡' },
        { percent: 72,  delay: 150,  label: 'ഭയങ്കര ഒപ്റ്റിമൈസേഷൻ 🤣' },
        { percent: 89,  delay: 200,  label: 'ദാ കഴിഞ്ഞു! കഴിഞ്ഞു! കഴിഞ്ഞു! 😂' },
        { percent: 99,  delay: 1200, label: 'ഒരു സെക്കൻഡ് കൂടി വെയിറ്റ് ചെയ്യ്...' },
        { percent: 100, delay: 300,  label: 'കഴിഞ്ഞു. പ്രതീക്ഷിച്ച പോലെ തന്നെ പൊട്ടി. 💀' },
      ];
    case 'freeze':
      return [
        { percent: 12, delay: 800,  label: 'തുടങ്ങുന്നു... (പതുക്കെ) ❄️' },
        { percent: 23, delay: 1200, label: 'പാഴ്സ് ചെയ്യുന്നു... (വളരെ പതുക്കെ) ⛄' },
        { percent: 34, delay: 2000, label: 'ടൈപ്പ് ചെക്ക് ചെയ്യുന്നു... (സ്ലോ മോഷൻ) 🧊' },
        { percent: 40, delay: 3000, label: 'ലിങ്ക് ചെയ്യുന്നു... 🥶' },
        { percent: 40, delay: 2500, label: '... മരവിച്ചു ...' },
        { percent: 40, delay: 2000, label: '... ഇപ്പോഴും മരവിപ്പാണ് ...' },
        { percent: 41, delay: 1500, label: 'ഒന്ന് ഇളകി... ❄️' },
        { percent: 100, delay: 400, label: 'കഴിഞ്ഞു. (അങ്ങനെയെങ്കിലും വിശ്വസിക്കാം.) 🧊' },
      ];
    case 'glitch':
      return [
        { percent: 30,  delay: 200, label: 'കമ്പൈൽ ചെയ്യുന്നു ⚡' },
        { percent: 67,  delay: 150, label: 'കമ്പൈൽ ചെയ്യുന്നുണ്ടേ!! ⛈️' },
        { percent: 12,  delay: 100, label: '██░░GLITCH░░██ 💀' },
        { percent: 89,  delay: 200, label: 'ദാ കഴിയാറായി— 🌪️' },
        { percent: 3,   delay: 100, label: 'എറർ എറർ എറർ— 😡' },
        { percent: 78,  delay: 150, label: 'റീബൂട്ടിങ് ⚡' },
        { percent: 100, delay: 300, label: 'പൊട്ടിത്തെറിച്ചു 💥' },
      ];
    default:
      return [
        { percent: 50,  delay: 500, label: 'കമ്പൈൽ ചെയ്യുന്നു...' },
        { percent: 100, delay: 500, label: 'കഴിഞ്ഞു.' },
      ];
  }
}

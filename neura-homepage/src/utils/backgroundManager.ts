// Background color constants
export const BACKGROUND_COLORS = {
  PAPYRUS_YELLOW: '#fdf6e3',
  LIGHT_BLUE: '#065787',
  NAVY_BLUE: '#0D3147',
  WHITE: '#ffffff',
  BLACK: '#000000'
} as const;

// Section background mapping - all sections now use static colors
export const SECTION_BACKGROUNDS = {
  'hero': BACKGROUND_COLORS.LIGHT_BLUE,
  'intro': BACKGROUND_COLORS.LIGHT_BLUE,
  'app': BACKGROUND_COLORS.NAVY_BLUE,
  'app-extended': BACKGROUND_COLORS.NAVY_BLUE,
  'app-statistics': BACKGROUND_COLORS.NAVY_BLUE,
  'coming-soon': BACKGROUND_COLORS.NAVY_BLUE,
  'science': BACKGROUND_COLORS.NAVY_BLUE,
  'science-4-panel': BACKGROUND_COLORS.NAVY_BLUE,
  'science-summary': BACKGROUND_COLORS.NAVY_BLUE,
  'blog': BACKGROUND_COLORS.NAVY_BLUE,
  'team': BACKGROUND_COLORS.NAVY_BLUE
} as const;

// Component-specific background colors (for sections that have their own backgrounds)
export const COMPONENT_BACKGROUNDS = {
  'AppSection': BACKGROUND_COLORS.NAVY_BLUE,
  'AppSectionExtended': BACKGROUND_COLORS.NAVY_BLUE,
  'AppSectionStatistics': BACKGROUND_COLORS.NAVY_BLUE,
  'ComingSoon': BACKGROUND_COLORS.NAVY_BLUE,
  'Science': BACKGROUND_COLORS.NAVY_BLUE,
  'Science4Panel': BACKGROUND_COLORS.NAVY_BLUE,
  'ScienceSummaryPage': BACKGROUND_COLORS.NAVY_BLUE,
  'Blog': BACKGROUND_COLORS.NAVY_BLUE,
  'MeetTheTeam': BACKGROUND_COLORS.NAVY_BLUE
} as const;

// Background manager - simplified to just set the consistent static background
export class BackgroundManager {
  private static instance: BackgroundManager;
  private currentSection: string | null = null;

  static getInstance(): BackgroundManager {
    if (!BackgroundManager.instance) {
      BackgroundManager.instance = new BackgroundManager();
    }
    return BackgroundManager.instance;
  }

  private constructor() {
    // Initialize with the consistent gradient background
    if (typeof window !== 'undefined') {
      this.setConsistentBackground();
    }
  }

  setConsistentBackground() {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    console.log('Removing all global background overrides - letting sections handle their own backgrounds');
    
    // Remove all background classes
    document.body.classList.remove('bg-app-color', 'bg-science-color');
    
    // Remove all background properties from body and html to let sections handle their own backgrounds
    document.body.style.removeProperty('background');
    document.body.style.removeProperty('background-color');
    document.body.style.removeProperty('transition');
    
    document.documentElement.style.removeProperty('background');
    document.documentElement.style.removeProperty('background-color');
    document.documentElement.style.removeProperty('transition');
  }

  setBackground(color: string, section?: string) {
    // This method is now deprecated - use setConsistentBackground instead
    this.setConsistentBackground();
    
    if (section) {
      this.currentSection = section;
    }
  }

  registerSection(sectionId: string, element: HTMLElement, backgroundColor: string) {
    // No longer need to register sections since we have a consistent background
    // This method is kept for compatibility but does nothing
    console.log(`Section ${sectionId} registered but background is now consistent`);
  }

  unregisterSection(sectionId: string) {
    // No longer need to unregister sections since we have a consistent background
    // This method is kept for compatibility but does nothing
  }

  getCurrentSection(): string | null {
    return this.currentSection;
  }

  cleanup() {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    // Cleanup is minimal since we're not using observers anymore
  }
}

// Export singleton instance
export const backgroundManager = BackgroundManager.getInstance(); 
// Background color constants
export const BACKGROUND_COLORS = {
  PAPYRUS_YELLOW: '#fdf6e3',
  LIGHT_BLUE: '#065787',
  NAVY_BLUE: '#0D3147',
  WHITE: '#ffffff',
  BLACK: '#000000',
  // Gradient colors from the palette
  GRADIENT_1: '#253F4A', // Darkest teal
  GRADIENT_2: '#365563', // Dark teal
  GRADIENT_3: '#446879', // Medium-dark teal
  GRADIENT_4: '#537d90', // Medium teal
  GRADIENT_5: '#608da2', // Medium-light blue
  GRADIENT_6: '#779eb2', // Light blue
  GRADIENT_7: '#8eb1c2', // Very light blue
  GRADIENT_8: '#acc8d7'  // Lightest blue
} as const;

// Section background mapping - using gradient colors in proper sequence
export const SECTION_BACKGROUNDS = {
  'hero': BACKGROUND_COLORS.GRADIENT_1,
  'intro': BACKGROUND_COLORS.GRADIENT_1,
  'app': BACKGROUND_COLORS.GRADIENT_2,
  'app-extended': BACKGROUND_COLORS.GRADIENT_3,
  'app-statistics': BACKGROUND_COLORS.GRADIENT_7,
  'coming-soon': BACKGROUND_COLORS.GRADIENT_8,
  'science': BACKGROUND_COLORS.GRADIENT_1,
  'science-4-panel': BACKGROUND_COLORS.GRADIENT_3,
  'science-summary': BACKGROUND_COLORS.GRADIENT_5,
  'blog': BACKGROUND_COLORS.GRADIENT_7,
  'team': BACKGROUND_COLORS.GRADIENT_7
} as const;

// Component-specific background colors (for sections that have their own backgrounds)
export const COMPONENT_BACKGROUNDS = {
  'AppSection': BACKGROUND_COLORS.GRADIENT_2,
  'AppSectionExtended': BACKGROUND_COLORS.GRADIENT_5,
  'AppSectionStatistics': BACKGROUND_COLORS.GRADIENT_7,
  'ComingSoon': BACKGROUND_COLORS.GRADIENT_8,
  'Science': BACKGROUND_COLORS.GRADIENT_1,
  'Science4Panel': BACKGROUND_COLORS.GRADIENT_3,
  'ScienceSummaryPage': BACKGROUND_COLORS.GRADIENT_5,
  'Blog': BACKGROUND_COLORS.GRADIENT_7,
  'MeetTheTeam': BACKGROUND_COLORS.GRADIENT_7
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
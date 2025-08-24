import { Link } from '../types';

// Database keys
const STORAGE_KEYS = {
  LINKS: 'mywaslat_links',
  FOLDERS: 'mywaslat_folders',
  SETTINGS: 'mywaslat_settings'
};

// Database interface
export interface DatabaseSettings {
  darkMode: boolean;
  language: 'ar' | 'en';
  viewLayout: 'grid' | 'list' | 'compact';
  currentView: string;
}

// Links operations
export const saveLinks = (links: Link[]): void => {
  try {
    const serializedLinks = links.map(link => ({
      ...link,
      createdAt: link.createdAt.toISOString()
    }));
    localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify(serializedLinks));
  } catch (error) {
    console.error('Error saving links:', error);
  }
};

export const loadLinks = (): Link[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.LINKS);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return parsed.map((link: any) => ({
      ...link,
      createdAt: new Date(link.createdAt)
    }));
  } catch (error) {
    console.error('Error loading links:', error);
    return [];
  }
};

// Folders operations
export const saveFolders = (folders: string[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.FOLDERS, JSON.stringify(folders));
  } catch (error) {
    console.error('Error saving folders:', error);
  }
};

export const loadFolders = (): string[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FOLDERS);
    if (!stored) return ['Work', 'Study', 'Fun', 'Personal'];
    
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading folders:', error);
    return ['Work', 'Study', 'Fun', 'Personal'];
  }
};

// Settings operations
export const saveSettings = (settings: DatabaseSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};

export const loadSettings = (): DatabaseSettings => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!stored) {
      return {
        darkMode: false,
        language: 'ar',
        viewLayout: 'grid',
        currentView: 'all'
      };
    }
    
    const settings = JSON.parse(stored);
    // Ensure language property exists for backward compatibility
    if (!settings.language) {
      settings.language = 'ar';
    }
    return settings;
  } catch (error) {
    console.error('Error loading settings:', error);
    return {
      darkMode: false,
      language: 'ar',
      viewLayout: 'grid',
      currentView: 'all'
    };
  }
};

// Clear all data
export const clearDatabase = (): void => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Also clear session storage
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
      
      // Clear any cached URLs or blobs
      if (window.URL && window.URL.revokeObjectURL) {
        // This will be handled by garbage collection
      }
      
      // Force garbage collection if available
      if (window.gc) {
        window.gc();
      }
    }
  } catch (error) {
    console.error('Error clearing database:', error);
  }
};

// Export/Import functionality
export const exportData = (): string => {
  try {
    const data = {
      links: loadLinks(),
      folders: loadFolders(),
      settings: loadSettings(),
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Error exporting data:', error);
    return '';
  }
};

export const importData = (jsonData: string): boolean => {
  try {
    const data = JSON.parse(jsonData);
    
    // Validate data structure
    if (!data.links || !data.folders || !data.settings) {
      throw new Error('Invalid data format');
    }
    
    // Import links
    const links = data.links.map((link: any) => ({
      ...link,
      createdAt: new Date(link.createdAt)
    }));
    saveLinks(links);
    
    // Import folders
    saveFolders(data.folders);
    
    // Import settings
    saveSettings(data.settings);
    
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};

// Database statistics
export const getDatabaseStats = () => {
  const links = loadLinks();
  const folders = loadFolders();
  
  return {
    totalLinks: links.length,
    totalFolders: folders.length,
    favoriteLinks: links.filter(link => link.isFavorite).length,
    readLaterLinks: links.filter(link => link.readLater).length,
    totalTags: Array.from(new Set(links.flatMap(link => link.tags))).length,
    storageUsed: new Blob([exportData()]).size
  };
};
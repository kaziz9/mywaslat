import { useState, useEffect } from 'react';
import { Link } from '../types';
import { 
  saveLinks, 
  loadLinks, 
  saveFolders, 
  loadFolders, 
  saveSettings, 
  loadSettings,
  DatabaseSettings 
} from '../utils/database';
import { mockLinks } from '../data/mockData';

export const useDatabase = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize database on first load
  useEffect(() => {
    const initializeDatabase = () => {
      try {
        // Check if this is the first time loading the app
        const existingLinks = loadLinks();
        const existingFolders = loadFolders();
        
        // If no data exists, load mock data
        if (existingLinks.length === 0) {
          saveLinks(mockLinks);
        }
        
        // Ensure default folders exist
        const defaultFolders = ['Work', 'Study', 'Fun', 'Personal'];
        const allFolders = Array.from(new Set([...defaultFolders, ...existingFolders]));
        saveFolders(allFolders);
        
        // Ensure settings have language property for backward compatibility
        const currentSettings = loadSettings();
        if (!currentSettings.language) {
          saveSettings({
            ...currentSettings,
            language: 'ar'
          });
        }
        
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing database:', error);
        setIsInitialized(true);
      }
    };

    initializeDatabase();
  }, []);

  // Auto-save functions
  const saveLinksToDatabase = (links: Link[]) => {
    saveLinks(links);
  };

  const saveFoldersToDatabase = (folders: string[]) => {
    saveFolders(folders);
  };

  const saveSettingsToDatabase = (settings: DatabaseSettings) => {
    saveSettings(settings);
  };

  return {
    isInitialized,
    loadLinks,
    saveLinks: saveLinksToDatabase,
    loadFolders,
    saveFolders: saveFoldersToDatabase,
    loadSettings,
    saveSettings: saveSettingsToDatabase
  };
};
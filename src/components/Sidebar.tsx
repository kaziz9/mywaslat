import React from 'react';
import { Folder, Tag, Bookmark, Heart, Settings, Plus, X, Trash2, Info, RotateCcw } from 'lucide-react';
import { t } from '../utils/translations';

interface SidebarProps {
  darkMode: boolean;
  currentView: string;
  onViewChange: (view: string) => void;
  folders: string[];
  tags: string[];
  trashCount: number;
  language: 'ar' | 'en';
  onAddFolder: (folderName: string) => void;
  onDeleteFolder: (folderName: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  darkMode,
  currentView,
  onViewChange,
  folders,
  tags,
  trashCount,
  language,
  onAddFolder,
  onDeleteFolder,
  isOpen,
  onClose,
}) => {
  const [showAddFolder, setShowAddFolder] = React.useState(false);
  const [newFolderName, setNewFolderName] = React.useState('');
  const [draggedFolder, setDraggedFolder] = React.useState<string | null>(null);
  const [isDragOverTrash, setIsDragOverTrash] = React.useState(false);

  const menuItems = [
    { id: 'all', label: t(language, 'allLinks'), icon: Folder, count: null },
    { id: 'favorites', label: t(language, 'favorites'), icon: Heart, count: null },
    { id: 'read-later', label: t(language, 'readLater'), icon: Bookmark, count: null },
    { id: 'trash', label: t(language, 'trash'), icon: Trash2, count: trashCount },
  ];

  const handleAddFolder = () => {
    if (newFolderName.trim() && !folders.includes(newFolderName.trim())) {
      onAddFolder(newFolderName.trim());
      setNewFolderName('');
      setShowAddFolder(false);
    }
  };

  const handleDeleteFolder = (folderName: string) => {
    if (window.confirm(t(language, 'deleteFolderConfirm', { folder: folderName }))) {
      onDeleteFolder(folderName);
    }
  };

  const handleDragStart = (e: React.DragEvent, folderName: string) => {
    // Don't allow dragging default folders
    const defaultFolders = ['Work', 'Study', 'Fun', 'Personal'];
    if (defaultFolders.includes(folderName)) {
      e.preventDefault();
      return;
    }
    
    setDraggedFolder(folderName);
    e.dataTransfer.setData('text/plain', folderName);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedFolder(null);
    setIsDragOverTrash(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOverTrash(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only hide if we're leaving the trash area completely
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOverTrash(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const folderName = e.dataTransfer.getData('text/plain');
    if (folderName && draggedFolder) {
      handleDeleteFolder(folderName);
    }
    setIsDragOverTrash(false);
    setDraggedFolder(null);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed md:relative top-0 left-0 z-50 md:z-auto
        w-72 sm:w-80 md:w-64 h-full md:h-auto
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        border-r transition-colors
        ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
      `}>
        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <img 
              src="/logo3.png" 
              alt="MyWaslat Logo" 
              className="w-8 h-8 rounded-full object-cover border-2 border-blue-500"
            />
            <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              MyWaslat
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
      <div className="p-4 md:p-6">
        {/* Main Navigation */}
        <nav className="space-y-1 mb-6 md:mb-8">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onViewChange(item.id);
                  // Close sidebar on mobile after selection
                  if (window.innerWidth < 768) {
                    onClose();
                  }
                  // Close sidebar on mobile after selection
                  if (window.innerWidth < 768) {
                    onClose();
                  }
                  // Close sidebar on mobile after selection
                  if (window.innerWidth < 768) {
                    onClose();
                  }
                }}
                className={`w-full flex items-center space-x-3 px-3 md:px-4 py-3 rounded-lg text-right transition-all duration-200 ${
                  currentView === item.id
                    ? darkMode 
                      ? 'bg-blue-900 text-blue-200' 
                      : 'bg-blue-100 text-blue-900'
                    : darkMode 
                      ? 'text-gray-300 hover:bg-gray-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-6 h-6 shrink-0" />
                <div className="flex items-center justify-between flex-1">
                  <span className="font-medium text-sm md:text-base">{item.label}</span>
                  {item.count !== null && item.count > 0 && (
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.id === 'trash'
                        ? darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'
                        : darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Folders Section */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-sm font-semibold ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {t(language, 'folders')}
            </h3>
            <button
              onClick={() => setShowAddFolder(true)}
              className={`p-1 rounded-lg transition-colors hover:scale-110 ${
                darkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
              title={t(language, 'addNewFolder')}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          {/* Add Folder Input */}
          {showAddFolder && (
            <div className="mb-3 p-2 md:p-3 rounded-lg border border-dashed border-gray-300">
              <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddFolder()}
                  placeholder={t(language, 'newFolderPlaceholder')}
                  className={`flex-1 px-2 py-2 text-sm border rounded ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  autoFocus
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleAddFolder}
                    className="flex-1 md:flex-none px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    {t(language, 'save')}
                  </button>
                  <button
                    onClick={() => {
                      setShowAddFolder(false);
                      setNewFolderName('');
                    }}
                    className={`flex-1 md:flex-none px-3 py-2 rounded text-sm transition-colors ${
                      darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {t(language, 'cancel')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Scrollable Folders Container */}
          <div className="relative">
            {/* Folders List with Scroll */}
            <div className={`space-y-1 max-h-48 md:max-h-56 overflow-y-auto ${
              darkMode 
                ? 'scrollbar-w-2 scrollbar-track-gray-800 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500' 
                : 'scrollbar-w-2 scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400'
            }`}>
            {folders.map(folder => (
              <div
                key={folder}
                draggable={!['Work', 'Study', 'Fun', 'Personal'].includes(folder)}
                onDragStart={(e) => handleDragStart(e, folder)}
                onDragEnd={handleDragEnd}
                className={`group flex items-center justify-between px-3 md:px-4 py-2.5 md:py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                  draggedFolder === folder 
                    ? 'opacity-50 scale-95 rotate-2' 
                    : ''
                } ${
                  currentView === `folder:${folder}`
                    ? darkMode 
                      ? 'bg-green-900 text-green-200' 
                      : 'bg-green-100 text-green-900'
                    : darkMode 
                      ? 'text-gray-400 hover:bg-gray-700' 
                      : 'text-gray-500 hover:bg-gray-50'
                } ${
                  !['Work', 'Study', 'Fun', 'Personal'].includes(folder) 
                    ? 'hover:shadow-md' 
                    : ''
                }`}
              >
                <button
                  onClick={() => {
                    onViewChange(`folder:${folder}`);
                    // Close sidebar on mobile after selection
                    if (window.innerWidth < 768) {
                      onClose();
                    }
                  }}
                  className="flex items-center space-x-3 flex-1 text-right"
                >
                  <Folder className="w-5 h-5 shrink-0" />
                  <span className="font-medium text-sm">
                    {['Work', 'Study', 'Fun', 'Personal'].includes(folder) 
                      ? t(language, folder.toLowerCase()) 
                      : folder
                    }
                  </span>
                </button>
                {!['Work', 'Study', 'Fun', 'Personal'].includes(folder) && (
                  <button
                    onClick={() => handleDeleteFolder(folder)}
                    className={`opacity-0 group-hover:opacity-100 p-1 rounded transition-all duration-200 hover:scale-110 ${
                      darkMode ? 'text-gray-500 hover:text-red-400' : 'text-gray-400 hover:text-red-600'
                    }`}
                    title={t(language, 'deleteFolder')}
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
            </div>
            
          </div>
        </div>

        {/* Drag to Delete Area */}
        {draggedFolder && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`fixed bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 p-4 md:p-6 rounded-xl border-2 border-dashed transition-all duration-300 z-50 ${
              isDragOverTrash
                ? darkMode
                  ? 'border-red-400 bg-red-900/20 text-red-300'
                  : 'border-red-400 bg-red-50 text-red-600'
                : darkMode
                  ? 'border-gray-600 bg-gray-800/90 text-gray-400'
                  : 'border-gray-300 bg-white/90 text-gray-600'
            } ${
              isDragOverTrash ? 'scale-105 shadow-2xl' : 'scale-100'
            }`}
          >
            <div className="flex items-center justify-center space-x-3">
              <Trash2 className={`w-6 h-6 md:w-8 md:h-8 transition-all duration-300 ${
                isDragOverTrash ? 'scale-125 animate-bounce' : ''
              }`} />
              <div className="text-center">
                <p className="font-semibold text-sm md:text-lg">
                  {isDragOverTrash ? t(language, 'dropToDelete') : t(language, 'dragToDelete')}
                </p>
                <p className="text-xs md:text-sm opacity-75">
                  {t(language, 'allLinksWillMove')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Popular Tags */}
        <div>
          <h3 className={`text-sm font-semibold mb-4 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {t(language, 'popularTags')}
          </h3>
          
          {/* Scrollable Tags Container */}
          <div className="relative">
            {/* Tags List with Scroll */}
            <div className={`max-h-32 md:max-h-40 overflow-y-auto ${
              darkMode 
                ? 'scrollbar-w-2 scrollbar-track-gray-800 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500' 
                : 'scrollbar-w-2 scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400'
            }`}>
              <div className="flex flex-wrap gap-1.5 md:gap-2 pb-2">
                {tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => {
                      onViewChange(`tag:${tag}`);
                      // Close sidebar on mobile after selection
                      if (window.innerWidth < 768) {
                        onClose();
                      }
                      // Close sidebar on mobile after selection
                      if (window.innerWidth < 768) {
                        onClose();
                      }
                    }}
                    className={`px-2.5 md:px-3 py-1.5 md:py-1 text-xs rounded-full transition-all duration-200 hover:scale-105 ${
                      currentView === `tag:${tag}`
                        ? darkMode 
                          ? 'bg-purple-900 text-purple-200' 
                          : 'bg-purple-100 text-purple-900'
                        : darkMode 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};
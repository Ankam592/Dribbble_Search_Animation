import { 
  FaUser, 
  FaRegCommentDots, 
  FaListUl, 
  FaFolder, 
  FaFileImage, 
  FaFileVideo, 
  FaFilePdf ,
} from 'react-icons/fa';

import { FiLink } from "react-icons/fi";  
import { BiLinkExternal } from "react-icons/bi";

export const dataArray = [
  // People
  {
    id: 1,
    name: "Ankam Manoj",
    type: "people",
    isActive: false,
    status: "Unactivated",
    lastActive: "5m ago",
    icon: FaUser,
    copylink : FiLink,
    newWindow : BiLinkExternal
  },
  {
    id: 2,
    name: "Alle Manasa",
    type: "people",
    isActive: true,
    status: "Activated",
    lastActive: "15m ago",
    icon: FaUser,
    copylink : FiLink,
    newWindow : BiLinkExternal
  },
  {
    id: 3,
    name: "Emma Davis",
    type: "people",
    isActive: false,
    status: "Unactivated",
    lastActive: "3h ago",
    icon: FaUser,
    copylink : FiLink,
    newWindow : BiLinkExternal
  },

  // Files
  {
    id: 4,
    name: "Learning",
    type: "file",
    fileType: "folder",
    parentFolder: "Root",
    filesCount: 31,
    action:'Edited 12m ago',
    icon: FaFolder,
    filescount : 4,
    copylink : FiLink,
    newWindow : BiLinkExternal
  },
  {
    id: 5,
    name: "profile_pic.jpg",
    type: "file",
    fileType: "image",
    parentFolder: "Images",
    action:'Added 12m ago',
    icon: FaFileImage,
    copylink : FiLink,
    newWindow : BiLinkExternal

  },
  {
    id: 6,
    name: "holiday_video.mp4",
    type: "file",
    fileType: "video",
    parentFolder: "Videos",
     action:'Added 12m ago',
      copylink : FiLink,
    icon: FaFileVideo,
     newWindow : BiLinkExternal
  },
  {
    id: 7,
    name: "design_mockup.avif",
    type: "file",
    fileType: "image",
    parentFolder: "Designs",
     action:'Added 12m ago',
    icon: FaFileImage,
     copylink : FiLink,
      newWindow : BiLinkExternal
    

    

  },
  {
    id: 8,
    name: "project_doc.pdf",
    type: "file",
    fileType: "document",
    parentFolder: "Documents",
     action:'Added 12m ago',
    icon: FaFilePdf,
    copylink : FiLink,
    newWindow : BiLinkExternal
  },

  // Chats
  {
    id: 9,
    type: "chat",
    name: "Project Alpha Discussion",
    lastMessage: "Let's finalize the design today.",
    from: "Olivia Taylor",
    icon: FaRegCommentDots,
    copylink : FiLink,
    newWindow : BiLinkExternal
  },
  {
    id: 10,
    type: "chat",
    name: "Team Standup",
    lastMessage: "Daily updates shared.",
    from: "Priya Sharma",
    icon: FaRegCommentDots,
    copylink : FiLink,
    newWindow : BiLinkExternal
  },

  // Lists
  {
    id: 11,
    type: "list",
    name: "UI Improvements",
    itemsCount: 12,
    completedCount: 8,
    icon: FaListUl,
    copylink : FiLink,
    newWindow : BiLinkExternal
  },
  {
    id: 12,
    type: "list",
    name: "Backend Tasks",
    itemsCount: 20,
    completedCount: 10,
    icon: FaListUl,
    copylink : FiLink,
    newWindow : BiLinkExternal
  }
];

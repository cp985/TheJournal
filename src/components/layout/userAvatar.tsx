import React from "react";
import { 
  FaGhost,        
  FaCat,          
  FaDog,          
  FaUserNinja,    
  FaUserAstronaut,
  FaRobot,        
  FaOtter,        
  FaUserSecret   
} from "react-icons/fa6";

export const AVATAR_MAP: Record<string, React.ReactNode> = {
  "icon:ninja": <FaUserNinja className="w-8 h-8 text-red-400" />,
  "icon:astronaut": <FaUserAstronaut className="w-8 h-8 text-blue-400" />,
  "icon:robot": <FaRobot className="w-8 h-8 text-amber-400" />,
  "icon:ghost": <FaGhost className="w-8 h-8 text-purple-400" />,
  "icon:cat": <FaCat className="w-8 h-8 text-orange-400" />,
  "icon:dog": <FaDog className="w-8 h-8 text-emerald-400" />,
  "icon:otter": <FaOtter className="w-8 h-8 text-teal-400" />,
  "icon:detective": <FaUserSecret className="w-8 h-8 text-zinc-300" />,
};

export default function UserAvatar({ avatarValue }: { avatarValue?: string }) {
  if (avatarValue && AVATAR_MAP[avatarValue]) {
    return (
      <div className="w-16 h-16 rounded-full bg-zinc-800 border-2 border-amber-500/50 flex items-center justify-center">
        {AVATAR_MAP[avatarValue]}
      </div>
    );
  }

  if (avatarValue && avatarValue.startsWith("http")) {
    return (
      <img
        src={avatarValue}
        alt="Avatar"
        className="w-16 h-16 rounded-full border-2 border-amber-500/50 object-cover"
      />
    );
  }

  return (
    <div className="w-16 h-16 rounded-full bg-zinc-800 border-2 border-amber-500/50 flex items-center justify-center">
      <FaUserSecret className="w-8 h-8 text-amber-500" />
    </div>
  );
}
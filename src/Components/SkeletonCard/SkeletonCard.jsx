import React from "react";
import './SkeletonCard.css'

// Skeleton loader card component
const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      {/* Avatar placeholder */}
      <div className="skeleton-avatar"></div>

      {/* Text placeholder */}
      <div className="skeleton-lines">
        <div className="skeleton-line_short"></div>
        <div className="skeleton-line_long"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;

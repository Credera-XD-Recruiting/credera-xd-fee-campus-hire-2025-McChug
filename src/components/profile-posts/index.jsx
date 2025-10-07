import './style.css';
import { getProfileData } from '../../services/profile';
import { useQuery } from '@tanstack/react-query';
import getInitials from '../../helpers/getInitials';
import { useState } from 'react';

export const ProfilePosts = () => {
  const [expandedPostById, setExpandedPostById] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfileData,
  });

  function formatPublishDate(isoString) {
    const date = new Date(isoString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return date.toLocaleDateString(undefined, options);
  }

  const toggleExpand = postId => {
    setExpandedPostById(expandedPostById === postId ? null : postId);
  };

  if (isLoading) {
    return (
      <section id="profile-posts">
        <h2 className="page-heading-2">Pinned Posts</h2>
        <div className="profile-post-results">
          <div className="content-card fade-in">
            <div className="post-author">
              <div className="post-author-avatar loading"></div>
              <div className="post-author-info">
                <div className="skeleton-block skeleton-block--half loading"></div>
                <div className="skeleton-block skeleton-block--quarter loading"></div>
              </div>
            </div>
            <div className="post-content skeleton-block loading"></div>
          </div>
        </div>
      </section>
    );
  }

  const { pinnedPosts } = data;

  return (
    <section id="profile-posts">
      <h2 className="page-heading-2">Pinned Posts</h2>
      <div className="profile-post-results">
        {pinnedPosts.map((pinnedPost, index) => {
          const authorInitials = getInitials(
            `${pinnedPost.authorFirstName} ${pinnedPost.authorLastName}`,
          );
          const postId = `post-${index}`;

          return (
            <div
              key={postId}
              className={
                'content-card ' +
                (expandedPostById === postId ? 'expanded' : '')
              }
              onClick={() => toggleExpand(postId)}
              tabindex="0"
            >
              <div className="post-author fade-in">
                <div className="post-author-avatar fade-in">
                  <span>{authorInitials}</span>
                </div>
                <div className="post-author-info fade-in">
                  <p className="page-paragraph">
                    {pinnedPost.authorFirstName} {pinnedPost.authorLastName}
                  </p>
                  <p className="page-micro">
                    {pinnedPost.jobTitle} @ {pinnedPost.companyName}
                  </p>
                </div>
                <div className="post-metadata">
                  <p>{formatPublishDate(pinnedPost.publishDate)}</p>
                  <p>
                    {pinnedPost.city}, {pinnedPost.state}
                  </p>
                </div>
              </div>
              <p className="page-body post-content fade-in">
                {pinnedPost.post}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

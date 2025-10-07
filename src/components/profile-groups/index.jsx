import './style.css';
import { getProfileData } from '../../services/profile';
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export const ProfileGroups = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfileData,
  });

  if (isLoading)
    return (
      <section id="profile-groups">
        <h2 className="page-heading-2">Groups</h2>
        <ul className="profile-group-results fade-in">
          <li className="profile-group-results-item">
            <div className="profile-group-results-card content-card skeleton-card">
              <div className="skeleton-img loading"></div>
              <div className="skeleton-block loading"></div>
            </div>
          </li>
          <li className="profile-group-results-item">
            <div className="profile-group-results-card content-card skeleton-card">
              <div className="skeleton-img loading"></div>
              <div className="skeleton-block loading"></div>
            </div>
          </li>
          <li className="profile-group-results-item">
            <div className="profile-group-results-card content-card skeleton-card">
              <div className="skeleton-img loading"></div>
              <div className="skeleton-block loading"></div>
            </div>
          </li>
          <li className="profile-group-results-item">
            <div className="profile-group-results-card content-card skeleton-card">
              <div className="skeleton-img loading"></div>
              <div className="skeleton-block loading"></div>
            </div>
          </li>
        </ul>
      </section>
    );

  const { groups } = data;

  const activityColorMapping = {
    active: 'background-secondary',
    moderate: 'background-primary',
    low: 'background-warning',
    inactive: 'background-grayscale_2',
  };

  return (
    <section id="profile-groups">
      <h2 className="page-heading-2">Groups</h2>
      <ul className="profile-group-results fade-in">
        {groups.map(group => (
          <li className="profile-group-results-item" key={group.id}>
            <a
              className={
                'profile-group-results-card content-card fade-in ' +
                activityColorMapping[group.activity]
              }
              href={group.href}
            >
              <div className="profile-group-avatar">
                <img src={group.image} />
              </div>
              <div className="profile-group-content">
                <div className="page-paragraph">
                  <p>
                    {group.name}&nbsp;
                    {group.favorite ? (
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="profile-group-icon"
                      />
                    ) : null}
                  </p>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

import './style.css';
import { getFriendsListData } from '../../services/profile';
import getInitials from '../../helpers/getInitials.js';
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export const ProfileFriends = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['friends'],
    queryFn: getFriendsListData,
  });

  if (isLoading)
    return (
      <section id="profile-friends">
        <div className="content-card fade-in">
          <h2 className="page-heading-2">Friends</h2>
          <ul className="profile-friends-list">
            <li className="profile-list-item">
              <div className="profile-list-item-avatar loading"></div>
              <div className="profile-list-item-info">
                <div className="skeleton-block skeleton-block--half loading"></div>
                <div className="skeleton-block--quarter loading"></div>
              </div>
            </li>
            <li className="profile-list-item">
              <div className="profile-list-item-avatar loading"></div>
              <div className="profile-list-item-info">
                <div className="skeleton-block skeleton-block--half loading"></div>
                <div className="skeleton-block--quarter loading"></div>
              </div>
            </li>
            <li className="profile-list-item">
              <div className="profile-list-item-avatar loading"></div>
              <div className="profile-list-item-info">
                <div className="skeleton-block skeleton-block--half loading"></div>
                <div className="skeleton-block--quarter loading"></div>
              </div>
            </li>
            <li className="profile-list-item">
              <div className="profile-list-item-avatar loading"></div>
              <div className="profile-list-item-info">
                <div className="skeleton-block skeleton-block--half loading"></div>
                <div className="skeleton-block--quarter loading"></div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    );

  const sortedFriends = data?.friends
    ? [...data.friends].sort((a, b) => {
        // sort by top friend
        if (a.topFriend && !b.topFriend) return -1;
        if (!a.topFriend && b.topFriend) return 1;

        // sort alphabetically by last name
        const aLastName = a.name.split(' ').slice(-1)[0];
        const bLastName = b.name.split(' ').slice(-1)[0];
        return aLastName.localeCompare(bLastName);
      })
    : [];

  return (
    <section id="profile-friends">
      <div className="content-card fade-in">
        <h2 className="page-heading-2">Friends</h2>
        <ul className="profile-friends-list">
          {sortedFriends.map((friend, index) => (
            <li className="profile-list-item fade-in" key={index}>
              <div className="profile-list-item-avatar">
                {friend.image ? (
                  <img className="avatar-loading" src={friend.image} />
                ) : (
                  <span>{getInitials(friend.name)}</span>
                )}
              </div>
              <div className="profile-list-item-info">
                <p className="page-paragraph">
                  {friend.name}&nbsp;
                  {friend.topFriend && (
                    <span className="top-friend">
                      <FontAwesomeIcon icon={faHeart} />
                    </span>
                  )}
                </p>

                <p className="page-micro">
                  {friend.jobTitle} @ {friend.companyName}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

import './style.css';
import { getFriendsListData } from '../../services/profile';
import { useQuery } from '@tanstack/react-query';

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

  const { friends } = data;

  return (
    <section id="profile-friends">
      <div className="content-card fade-in">
        <h2 className="page-heading-2">Friends</h2>
        <ul className="profile-friends-list">
          {friends.map((friend, index) => (
            <li className="profile-list-item fade-in" key={index}>
              <div className="profile-list-item-avatar">
                <img className="loading" src={friend.image} />
              </div>
              <div className="profile-list-item-info">
                <p className="page-paragraph">{friend.name}</p>
                {friend.topFriend ? (
                  <p className="top-friend">Top Friend</p>
                ) : (
                  <div></div>
                )}
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

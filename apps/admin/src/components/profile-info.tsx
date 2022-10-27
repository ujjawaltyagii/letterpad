import Image from "next/image";

interface Props {
  name: string;
  avatar?: string;
  site_url: string;
}
const ProfileInfo: React.FC<Props> = ({ name, avatar, site_url }) => {
  return (
    <>
      <div className="profile-wrapper fixed bottom-0 w-full border-t border-t-zinc-800 bg-zinc-900 p-4">
        {avatar && (
          <div
            style={{
              borderRadius: 100,
              border: "1px solid #fff",
              overflow: "hidden",
              display: "flex",
            }}
          >
            <Image src={avatar} width={40} height={40} alt={name} />
          </div>
        )}
        <div className="flex">
          <span>{name}</span>
          <span>
            <a href={site_url} target="_blank" rel="noreferrer">
              View Site
            </a>
          </span>
        </div>
      </div>
      <style jsx>{`
        .flex {
          display: flex;
          flex-direction: column;
        }
        .profile-wrapper {
          display: flex;
          color: #fff;
          align-items: center;
          gap: 8px;
        }
        img {
          width: 40px;
          border-radius: 50%;
          border: 2px solid #4a4a5e;
        }
      `}</style>
    </>
  );
};

export default ProfileInfo;

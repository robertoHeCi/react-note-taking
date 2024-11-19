import { useUsers } from '@/hooks/useUsers';

const MentionModal = ({ query, insertMention, showMentions, position }: { query: string, insertMention: (username: string) => void, showMentions: boolean, position: { x: number, y: number } }) => {
  const { users, isLoading } = useUsers(showMentions ? query : "melany");
  return (
    <div
      className="fixed z-10 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700"
      {...position.y !== 0 && position.x !== 0 && { style: { top: position.y, left: position.x } }}
      autoFocus
    >
      {isLoading ? (
        <div className="p-2 text-sm text-gray-500">Loading...</div>
      ) : users && users.length > 0 ? (
        <ul className="py-1">
          {users.map((user) => (
            <li
              key={user.username}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2"
              onClick={() => insertMention(user.first_name + " " + user.last_name)}
              autoFocus
            >
              <div>
                <div className="text-sm font-medium">{user.first_name} {user.last_name}</div>
                <div className="text-xs text-gray-500">@{user.username}</div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-2 text-sm text-gray-500">No users found</div>
      )}
    </div>
  )
}

export default MentionModal;
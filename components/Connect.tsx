export default function Connect({ connect }: { connect: () => void }) {
  return (
    <button
      className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 py-7 px-9 rounded-md text-gray-800 text-xl"
      onClick={connect}
    >
      Connect
    </button>
  );
}

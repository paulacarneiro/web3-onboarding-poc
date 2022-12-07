import { ChangeEvent, FormEvent, ReactNode, useState } from "react";

export default function Card({
  children,
  handleSubmit,
  handleChangeAction,
  handleChangeNetwork,
  handleChangeAddress,
}: {
  children?: ReactNode;
  handleSubmit: (ev: FormEvent<HTMLFormElement>) => void;
  handleChangeAction: (ev: ChangeEvent<HTMLSelectElement>) => void;
  handleChangeNetwork: (ev: ChangeEvent<HTMLSelectElement>) => void;
  handleChangeAddress: (ev: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="bg-gradient-to-r from-pink-200 via-purple-300 to-indigo-400 py-7 px-9 rounded-md text-gray-800 text-xl">
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 justify-between">
        <input
          required
          className="w-full h-10 bg-violet-100 rounded text-gray-700 pl-2"
          type="text"
          placeholder="search by address or tx hash..."
          onChange={handleChangeAddress}
        />
        <select
          name="action type"
          id="action type"
          className="w-fit bg-violet-100 rounded-full text-gray-700 px-2 py-1"
          onChange={handleChangeAction}
        >
          <option value="user balance">User balance</option>
          <option value="transaction details">Transaction Details</option>
        </select>
        <select
          name="network"
          id="network"
          className="w-fit bg-violet-100 rounded-full text-gray-700 px-2 py-1"
          onChange={handleChangeNetwork}
        >
          <option value="mainnet">Mainnet</option>
          <option value="goerli">Goerli Tesnet</option>
          <option value="ropsten">Ropsten Tesnet</option>
        </select>
        <button
          className="w-10 h-10 p-4 flex justify-center items-center border-white border rounded text-white text-sm hover:bg-white hover:text-violet-400 transition-all active:text-xs"
          type="submit"
        >
          GO
        </button>
      </form>
      <div className="text-gray-800 mt-12 text-center">{children}</div>
    </div>
  );
}

import { useState, FormEvent, ChangeEvent } from "react";
import { weiToEth } from "../lib/convertEth";
import { ethers } from "ethers";
import Card, { ActionTypes } from "../components/Card";
import Connect from "../components/Connect";

export default function Home() {
  const [connected, setConnected] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [actionType, setActionType] = useState<string>("user balance");
  const [network, setNetwork] = useState<string>("mainnet");
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [data, setData] = useState<{ [key: string]: string | number }>({});

  const connect = () => setConnected(true);

  const getTransactionDetails = async () => {
    const res = await fetch(`/api/transaction?address=${address}&network=${network}`);
    const { data, error } = await res.json();

    if (data) {
      setData({
        hash: data.hash,
        value: `${weiToEth(data.value)} ETH`,
        from: data.from,
        to: data.to,
        "transaction fee": `${weiToEth(0x5208 * 0x56f9e4dae)} ETH`,
      });
    } else if (error) {
      setData({ error: error.message });
    }
  };

  const getUserBalance = async () => {
    const res = await fetch(`/api/userBalance?address=${address}&network=${network}`);
    const { data, error } = await res.json();

    if (data) {
      setData({
        amount: `${weiToEth(data)} ETH`,
      });
    } else if (error) {
      setData({ error: error.message });
    }
  };

  const getEnsName = async () => {
    try {
      if (!window.ethereum) return;
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const data = await provider.lookupAddress(address);

      if (data) {
        setData({ "ENS name": data });
      } else {
        setData({ "ENS name": "not defined" });
      }
    } catch (e) {
      setData({ error: "address not found" });
    }
  };

  const checkAddress = async () => {
    try {
      const data = await ethers.utils.getAddress(address);

      if (data) {
        setData({ address: "exists" });
      }
    } catch (e) {
      setData({ error: "address not found" });
    }
  };

  const checkNft = async () => {
    const res = await fetch(
      `/api/nft?address=${address}&tokenAddress=${tokenAddress}&network=${network}`
    );

    const { data, error } = await res.json();

    if (data) {
      setData(
        data.reduce((dataObj: any, item: any) => {
          return {
            ...dataObj,
            tokenSymbol: item.tokenSymbol,
            tokenName: item.tokenName,
            [item.tokenID]: `${new Date(Number(item.timeStamp) * 1000).toLocaleDateString()}, ${
              item.hash
            }`,
          };
        }, {})
      );
    } else if (error) {
      setData({ error: error as string });
    }
  };

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    switch (actionType) {
      case ActionTypes.USER_BALANCE:
        getUserBalance();
        break;
      case ActionTypes.TRANSACTION_DETAILS:
        getTransactionDetails();
        break;
      case ActionTypes.ENS_NAME:
        getEnsName();
        break;
      case ActionTypes.CHECK_ADDRESS:
        checkAddress();
        break;
      case ActionTypes.HAS_NFT:
        checkNft();
        break;
      default:
        break;
    }
  };

  const handleChangeAddress = (ev: ChangeEvent<HTMLInputElement>) => setAddress(ev.target.value);

  const handleChangeTokenAddress = (ev: ChangeEvent<HTMLInputElement>) =>
    setTokenAddress(ev.target.value);

  const handleChangeNetwork = (ev: ChangeEvent<HTMLSelectElement>) => setNetwork(ev.target.value);

  const handleChangeAction = (ev: ChangeEvent<HTMLSelectElement>) => setActionType(ev.target.value);

  return (
    <div className="h-screen bg-gray-900 font-studio text-gray-800 antialiased">
      <main className="p-10">
        {connected ? (
          <div className="w-[60rem] mx-auto mt-32">
            <Card
              handleSubmit={handleSubmit}
              handleChangeNetwork={handleChangeNetwork}
              handleChangeAction={handleChangeAction}
              handleChangeAddress={handleChangeAddress}
              handleChangeTokenAddress={handleChangeTokenAddress}
              extraInput={actionType === ActionTypes.HAS_NFT}
            >
              <div>
                {Object.keys(data).map((key, idx) => (
                  <p className="mb-2" key={idx}>
                    {key}: {data[key]}
                  </p>
                ))}
              </div>
            </Card>
          </div>
        ) : (
          <div className="w-fit mx-auto mt-32">
            <Connect connect={connect} />
          </div>
        )}
      </main>
    </div>
  );
}

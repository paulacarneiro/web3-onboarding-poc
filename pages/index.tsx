import { useState, FormEvent, ChangeEvent } from "react";
import { toEth, toGwei } from "../lib/convertNumber";
import Card from "../components/Card";
import Connect from "../components/Connect";

export default function Home() {
  const [connected, setConnected] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [actionType, setActionType] = useState<string>("user balance");
  const [network, setNetwork] = useState<string>("mainnet");
  const [data, setData] = useState<{ [key: string]: string | number }>({});

  const connect = () => setConnected(true);

  const getTransactionDetails = async () => {
    const res = await fetch(`/api/transaction?address=${address}&network=${network}`);
    const { data, error } = await res.json();

    if (data) {
      setData({
        hash: data.hash,
        value: `toEth(data.value) ETH
        `,
        from: data.from,
        to: data.to,
        "transaction fee": `${toEth(0x5208 * 0x56f9e4dae)} ETH`,
      });
    } else if (error) {
      setData({ error });
    }
  };

  const getUserBalance = async () => {
    const res = await fetch(`/api/userBalance?address=${address}&network=${network}`);
    const { data, error } = await res.json();

    console.log(toEth(data));

    if (data) {
      setData({
        amount: `${toEth(data)} ETH`,
      });
    } else if (error) {
      setData({ error });
    }
  };

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    switch (actionType) {
      case "user balance":
        getUserBalance();
        break;
      case "transaction details":
        getTransactionDetails();
        break;
      default:
        break;
    }
  };

  const handleChangeAddress = (ev: ChangeEvent<HTMLInputElement>) => setAddress(ev.target.value);

  const handleChangeNetwork = (ev: ChangeEvent<HTMLSelectElement>) => setNetwork(ev.target.value);

  const handleChangeAction = (ev: ChangeEvent<HTMLSelectElement>) => setActionType(ev.target.value);

  return (
    <div className="h-screen bg-gray-900">
      <main className="p-10">
        {connected ? (
          <div className="w-[60rem] mx-auto mt-32">
            <Card
              handleSubmit={handleSubmit}
              handleChangeNetwork={handleChangeNetwork}
              handleChangeAction={handleChangeAction}
              handleChangeAddress={handleChangeAddress}
            >
              <div>
                {Object.keys(data).map((key, idx) => (
                  <p className="mb-2" key={idx}>
                    {key} : {data[key]}
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

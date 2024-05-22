"use client";

import { useAccount, useBalance, useEnsName } from "wagmi";
import { formatUnits } from "viem";

export default function Profile() {
  // account state
  const { address, chain } = useAccount();

  // web3 hooks
  const { data } = useBalance({
    address,
  });

  const ens = useEnsName({
    address,
  });

  // view
  return (
    <div>
      <div>
        <h2>Wallet address</h2>
        <p>
          {address || ""}
        </p>
      </div>

      <div>
        <h2>Network</h2>
        <p>
          {chain?.name || ""}
        </p>
      </div>

      <div>
        <h2>Balance</h2>
        <div>
          {data ? (
            <p>
              {Number(formatUnits(data.value, data.decimals)).toFixed(4)}{" "}
              {data.symbol}
            </p>
          ) : (
            <div />
          )}
        </div>
      </div>

      <div>
        <h2>EnsName</h2>
        <p>
          {ens.data || ""}
        </p>
      </div>
    </div>
  );
}
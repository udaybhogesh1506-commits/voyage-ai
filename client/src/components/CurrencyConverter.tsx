import {
  useState,
} from "react";

const currencies = [
  "INR",
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "AUD",
  "CAD",
  "CHF",
  "CNY",
  "AED",
  "SGD",
  "NZD",
  "KRW",
  "THB",
  "MYR",
  "IDR",
  "PHP",
  "SAR",
  "ZAR",
];

function CurrencyConverter() {
  const [amount, setAmount] =
    useState("1000");

  const [fromCurrency, setFromCurrency] =
    useState("INR");

  const [toCurrency, setToCurrency] =
    useState("USD");

  const [result, setResult] =
    useState<number | null>(null);

  const [rate, setRate] =
    useState<number | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const convertCurrency = async () => {
    const numericAmount =
      Number(amount);

    if (
      !numericAmount ||
      numericAmount <= 0
    ) {
      setError(
        "Please enter a valid amount."
      );
      return;
    }

    if (fromCurrency === toCurrency) {
      setRate(1);
      setResult(numericAmount);
      setError("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const response = await fetch(
        `https://api.frankfurter.dev/v2/rate/${fromCurrency}/${toCurrency}`
      );

      const data = await response.json();

      if (!response.ok || !data.rate) {
        throw new Error(
          data.message ||
            "Unable to retrieve exchange rate"
        );
      }

      const currentRate =
        Number(data.rate);

      setRate(currentRate);

      setResult(
        numericAmount *
          currentRate
      );
    } catch (error) {
      console.error(
        "CURRENCY CONVERSION ERROR:",
        error
      );

      setError(
        "Currency conversion is currently unavailable."
      );
    } finally {
      setLoading(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
    setRate(null);
    setError("");
  };

  return (
    <div className="mt-14">
      <div className="mb-8">
        <h2 className="text-4xl font-bold">
          Currency Converter
        </h2>

        <p className="text-gray-400 mt-3">
          Convert your travel budget using
          current reference exchange rates.
        </p>
      </div>

      <div className="bg-gradient-to-br from-indigo-600/20 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-3xl p-7 md:p-9">
        <div className="grid md:grid-cols-[1fr_1fr_auto_1fr] gap-5 items-end">
          <div>
            <label className="block text-gray-300 mb-2">
              Amount
            </label>

            <input
              type="number"
              min="0"
              value={amount}
              onChange={(event) => {
                setAmount(
                  event.target.value
                );
                setResult(null);
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">
              From
            </label>

            <select
              value={fromCurrency}
              onChange={(event) => {
                setFromCurrency(
                  event.target.value
                );
                setResult(null);
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
            >
              {currencies.map(
                (currency) => (
                  <option
                    key={currency}
                    value={currency}
                  >
                    {currency}
                  </option>
                )
              )}
            </select>
          </div>

          <button
            type="button"
            onClick={swapCurrencies}
            className="border border-slate-700 hover:border-indigo-500 rounded-xl px-5 py-3 transition"
            title="Swap currencies"
          >
            ⇄
          </button>

          <div>
            <label className="block text-gray-300 mb-2">
              To
            </label>

            <select
              value={toCurrency}
              onChange={(event) => {
                setToCurrency(
                  event.target.value
                );
                setResult(null);
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
            >
              {currencies.map(
                (currency) => (
                  <option
                    key={currency}
                    value={currency}
                  >
                    {currency}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={convertCurrency}
          disabled={loading}
          className="mt-7 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900 disabled:cursor-not-allowed px-7 py-3 rounded-xl font-semibold transition"
        >
          {loading
            ? "Converting..."
            : "Convert Currency"}
        </button>

        {error && (
          <div className="mt-6 bg-red-500/10 border border-red-500/40 rounded-xl p-4">
            <p className="text-red-400">
              {error}
            </p>
          </div>
        )}

        {result !== null &&
          rate !== null && (
            <div className="mt-7 bg-slate-950/60 border border-indigo-500/30 rounded-2xl p-6">
              <p className="text-gray-400">
                Converted amount
              </p>

              <h3 className="text-4xl font-bold text-indigo-300 mt-2">
                {result.toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: 2,
                  }
                )}{" "}
                {toCurrency}
              </h3>

              <p className="text-gray-400 mt-4">
                1 {fromCurrency} ={" "}
                {rate.toFixed(4)}{" "}
                {toCurrency}
              </p>

              <p className="text-xs text-gray-500 mt-3">
                Reference rates only. Your
                bank or payment provider may
                use a different rate.
              </p>
            </div>
          )}
      </div>
    </div>
  );
}

export default CurrencyConverter;
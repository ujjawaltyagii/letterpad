import classNames from "classnames";
import { IoMdCheckmark } from "react-icons/io";

import { CheckoutButton } from "./checkout-btn";

export const PricingTable = ({ hasSession, showFreeTier = true }) => {
  return (
    <div
      className={classNames(
        "space-y-4 lg:grid sm:gap-3 xl:gap-5 lg:space-y-0",
        {
          "lg:grid-cols-1": !showFreeTier,
          "lg:grid-cols-2": showFreeTier,
        }
      )}
    >
      {showFreeTier && (
        <Item
          title="Free"
          items={[
            "Maximum 5 posts allowed",
            "Build Subscribers",
            "Basic Support",
            null,
            null,
            null,
            null,
          ]}
          action={
            <CheckoutButton
              label={`${hasSession ? "Select" : "Sign up for free"}`}
              role={hasSession ? "checkout" : "register"}
            />
          }
        />
      )}
      <Item
        title="Pro"
        items={[
          "Unlimited Posts",
          "Domain Mapping",
          "Analytics",
          "Creatives to create photo blog page",
          "Custom Email Template for Subscribers",
          "Pro Badge",
          "And more...",
        ]}
        action={
          <CheckoutButton
            label={`${hasSession ? "Subscribe for $5/month" : "Sign up for $5/month"}`}
            role={hasSession ? "checkout" : "register"}
          />
        }
      />
    </div>
  );
};

const Item = ({ items, title, action }) => {
  return (
    <div className="flex flex-col p-3 mx-auto max-w-sm text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-6 dark:bg-gray-800 dark:text-white">
      <h3 className="mb-4 pb-2 text-lg font-semibold border-b dark:border-gray-700 border-gray-200">
        {title}
      </h3>
      <ul role="list" className="mb-8 space-y-1 text-left text-sm">
        {items.map((item) => (
          <li
            className="flex items-center space-x-2 font-paragraph h-6"
            key={item}
          >
            {item && <IoMdCheckmark size={14} className={"text-green-500"} />}
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {action}
    </div>
  );
};

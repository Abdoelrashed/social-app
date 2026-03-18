import React from "react";

export default function DetectOffline() {
  return (
    <>
      {!online && (
        <div className="fixed inset-0 bg-slate-900/70 text-amber-50 z-50 justify-center flex items-center">
          <h1 className="font-bold  text-4xl">🔴you are offline now..</h1>
        </div>
      )}
    </>
  );
}

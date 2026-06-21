import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import SyncUser from "./components/SyncUser";

function App() {
  return (
    <div>
      <header>
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
        <SignedIn>
          <UserButton />
          {/* Jaise hi login hoga, yeh component user ko database mein save karwa dega */}
          <SyncUser /> 
        </SignedIn>
      </header>

      <main>
        <h1>Welcome to WhatsApp Clone</h1>
        {/* Aapki baki chat screen ka code yahan aye ga */}
      </main>
    </div>
  );
}

export default App;
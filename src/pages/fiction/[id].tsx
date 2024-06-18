import { useRouter } from "next/router";

export default function FictionPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center">
        <button className="btn">Button</button>

        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
      </div>
    </main>
  );
}

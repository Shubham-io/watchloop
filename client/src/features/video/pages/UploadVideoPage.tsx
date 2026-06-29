import UploadVideoForm from "../components/UploadVideoForm";

const UploadVideoPage = () => {
  return (
    <section className="container mx-auto max-w-5xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Upload Video</h1>

        <p className="mt-2 text-muted-foreground">
          Share your video with the WatchLoop community.
        </p>
      </div>

      <UploadVideoForm />
    </section>
  );
};

export default UploadVideoPage;
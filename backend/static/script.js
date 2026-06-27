const BASE_URL = "http://localhost:8000";

let draftId = null;

const description = document.getElementById("description");
const generateBtn = document.getElementById("generateBtn");
const connectBtn = document.getElementById("connectBtn");
const postText = document.getElementById("postText");
const publishArea = document.getElementById("publishArea");
const imageInput = document.getElementById("image");
const publishBtn = document.getElementById("publishBtn");
const status = document.getElementById("status");

generateBtn.addEventListener("click", generatePost);
connectBtn.addEventListener("click", connectLinkedIn);
publishBtn.addEventListener("click", publishPost);

async function generatePost() {
    status.innerHTML = "Generating post...";

    connectBtn.style.display = "none";
    publishArea.style.display = "none";

    try {
        const response = await fetch(`${BASE_URL}/linkedin/generate-post`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                description: description.value,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.log(data);

            status.innerHTML =
                data.detail ||
                data.error ||
                "Failed to generate post.";

            connectBtn.style.display = "inline-block";
            return;
        }

        if (data.status === "not_connected") {
            status.innerHTML =
                data.error ||
                "Please connect your LinkedIn account.";

            connectBtn.style.display = "inline-block";
            return;
        }

        draftId = data.draft_id;

        postText.value = data.post_text;

        publishArea.style.display = "block";

        status.innerHTML = "Draft generated successfully.";
    } catch (err) {
        console.error(err);
        status.innerHTML = "Server unavailable.";
    }
}

function connectLinkedIn() {
    window.location.href = `${BASE_URL}/linkedin/auth/login`;
}

async function publishPost() {
    if (!draftId) {
        status.innerHTML = "Generate a draft first.";
        return;
    }

    status.innerHTML = "Publishing...";

    const formData = new FormData();

    formData.append("draft_id", draftId);
    formData.append("approved", "true");

    if (imageInput.files.length > 0) {
        formData.append("images", imageInput.files[0]);
    }

    try {
        const response = await fetch(`${BASE_URL}/linkedin/confirm-post`, {
            method: "POST",
            credentials: "include",
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            console.log(data);

            status.innerHTML =
                data.detail ||
                data.error ||
                "Publish failed.";

            return;
        }

        switch (data.status) {
            case "posted":
                status.innerHTML =
                    `✅ Posted Successfully<br><br>Post ID: ${data.post_id}`;

                draftId = null;

                description.value = "";
                postText.value = "";
                imageInput.value = "";

                publishArea.style.display = "none";

                break;

            case "not_connected":
                status.innerHTML = data.error;

                connectBtn.style.display = "inline-block";

                break;

            case "draft_not_found":
                status.innerHTML = data.error;

                break;

            case "failed":
                status.innerHTML = data.error;

                break;

            default:
                status.innerHTML =
                    data.error || "Publishing failed.";
        }
    } catch (err) {
        console.error(err);
        status.innerHTML = "Server unavailable.";
    }
}
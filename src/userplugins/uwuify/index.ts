import definePlugin from "@utils/types";

// Function to replace text based on the uwuify rules
const uwuifyText = (text) => {
    let replacements = {
        "hello": "hewwo",
        "hi": "hewwo",
        "god": "gawd",
        "father": "daddy",
        "papa": "papi",
        "mom": "mommy",
        "mother": "mommy",
        "r": "w",
        "l": "w",
        "R": "W",
        "L": "W"
    };

    let msg = text;

    for (const [old, newStr] of Object.entries(replacements)) {
        msg = msg.split(old).join(newStr);
    }

    msg = msg.replace(/n([aeiou])/g, "ny$1")
             .replace(/N([aeiou])/g, "Ny$1")
             .replace(/N([AEIOU])/g, "NY$1");

    if (/^[a-zA-Z]/.test(msg)) {
        msg = `-${msg}`;
    }

    if (/[a-zA-Z]$/.test(msg)) {
        msg = `${msg}~~`;
    }

    return msg;
};

export default definePlugin({
    name: "Uwuify Plugin",
    description: "This plugin uwuifies your text.",
    authors: [
        {
            id: 1119711455009312789,
            name: "Richard K",
        },
    ],
    patches: [],
    start() {
        // Hook into the text input or message send function
        // This is an example and might need to be adapted based on the actual Discord/Vencord API
        const textArea = document.querySelector("textarea");
        if (textArea) {
            textArea.addEventListener("input", (event) => {
                const originalText = event.target.value;
                event.target.value = uwuifyText(originalText);
            });
        }
    },
    stop() {
        // Clean up any event listeners or patches
        const textArea = document.querySelector("textarea");
        if (textArea) {
            textArea.removeEventListener("input", this.start);
        }
    },
});

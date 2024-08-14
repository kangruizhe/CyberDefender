document.getElementById("startButton").addEventListener("click", function() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("directoryScreen").style.display = "block";
});

document.getElementById("passwordGameButton").addEventListener("click", function() {
    document.getElementById("directoryScreen").style.display = "none";
    document.getElementById("passwordGameScreen").style.display = "block";
});

document.getElementById("phishingGameButton").addEventListener("click", function() {
    document.getElementById("directoryScreen").style.display = "none";
    document.getElementById("phishingGameScreen").style.display = "block";
});

document.getElementById("socialGameButton").addEventListener("click", function() {
    document.getElementById("directoryScreen").style.display = "none";
    document.getElementById("socialGameScreen").style.display = "block";
});

document.getElementById("backToDirectory1").addEventListener("click", function() {
    document.getElementById("passwordGameScreen").style.display = "none";
    document.getElementById("directoryScreen").style.display = "block";
});

document.getElementById("backToDirectory2").addEventListener("click", function() {
    document.getElementById("phishingGameScreen").style.display = "none";
    document.getElementById("directoryScreen").style.display = "block";
});

document.getElementById("backToDirectory3").addEventListener("click", function() {
    document.getElementById("socialGameScreen").style.display = "none";
    document.getElementById("directoryScreen").style.display = "block";
});
// 在 script.js 中的生成密码逻辑
function generatePassword() {
    const length = document.getElementById("length").value;
    const includeUppercase = document.getElementById("includeUppercase").checked;
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const includeSymbols = document.getElementById("includeSymbols").checked;

    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let characters = lowercase;
    if (includeUppercase) characters += uppercase;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    let password = "";
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    document.getElementById("generatedPassword").innerText = `恭喜你，生成了一个密码: ${password}`;
}

document.getElementById("generatePassword").addEventListener("click", generatePassword);
// 钓鱼邮件数据（每封邮件包含主题和是否为钓鱼邮件的标志）
const emails = [
    {subject: "邮件1：您的账户已被冻结，请点击此处解锁。", isPhishing: true},
    {subject: "邮件2：恭喜您获得大奖，请立即领取。", isPhishing: true},
    {subject: "邮件3：请核实您的账户信息，以确保安全。", isPhishing: true},
    {subject: "邮件4：获取50%折扣，限时优惠！", isPhishing: false},
    {subject: "邮件5：我们发现您的账户有异常活动，请立即检查。", isPhishing: true},
    {subject: "邮件6：您的信用卡积分即将过期，请及时使用。", isPhishing: false},
    {subject: "邮件7：立即点击，获取最新的促销优惠！", isPhishing: true},
    {subject: "邮件8：您的发票已准备好，请查收。", isPhishing: false},
    {subject: "邮件9：紧急：请立即更新您的支付信息。", isPhishing: true},
    {subject: "邮件10：限时优惠，立享免费配送！", isPhishing: false},
    {subject: "邮件11：请立即更改您的密码，以确保账户安全。", isPhishing: true},
    {subject: "邮件12：您的账户将被关闭，请点击此处重新激活。", isPhishing: true},
    {subject: "邮件13：特惠通知：购买此商品享受额外折扣。", isPhishing: false},
    {subject: "邮件14：您的订单已发货，请查看物流信息。", isPhishing: false},
    {subject: "邮件15：重要：请核实您的身份信息。", isPhishing: true},
    {subject: "邮件16：您有一封新的语音邮件，请点击收听。", isPhishing: true},
    {subject: "邮件17：确认您的账号信息以领取奖励。", isPhishing: true},
    {subject: "邮件18：您的银行账户有异常活动，请立即查看。", isPhishing: true},
    {subject: "邮件19：本月账单已生成，请点击查看详细信息。", isPhishing: false},
    {subject: "邮件20：我们检测到您的密码已泄露，请立即更改。", isPhishing: true},
    {subject: "邮件21：您的支付已成功，感谢您的购买。", isPhishing: false},
    {subject: "邮件22：特惠提醒：快来查看最新的优惠信息。", isPhishing: false},
    {subject: "邮件23：您的账户存在未支付的费用，请立即支付。", isPhishing: true},
    {subject: "邮件24：您的支付信息已更新，请核实。", isPhishing: false},
    {subject: "邮件25：请确认您的身份信息，以防账户被锁定。", isPhishing: true},
    {subject: "邮件26：您的包裹正在派送中，请点击查看详情。", isPhishing: false},
    {subject: "邮件27：重要安全通知：请立即更新您的账户密码。", isPhishing: true},
    {subject: "邮件28：您的退款请求已处理，请查看详情。", isPhishing: false},
    {subject: "邮件29：账户安全通知：请核实您的登录信息。", isPhishing: true},
    {subject: "邮件30：您的账户余额不足，请及时充值。", isPhishing: false},
];

let currentPage = 1;
const emailsPerPage = 10;

// 显示邮件列表
function showEmails(page) {
    const emailList = document.getElementById("emailList");
    emailList.innerHTML = ""; // 清空之前的内容

    const start = (page - 1) * emailsPerPage;
    const end = start + emailsPerPage;
    const paginatedEmails = emails.slice(start, end);

    paginatedEmails.forEach((email, index) => {
        const emailElement = document.createElement("div");
        emailElement.innerHTML = `
            <input type="checkbox" id="email${start + index}">
            <label for="email${start + index}">${email.subject}</label>
        `;
        emailList.appendChild(emailElement);
    });

    // 更新页码信息
    document.getElementById("pageInfo").innerText = `第 ${page} 页，共 ${Math.ceil(emails.length / emailsPerPage)} 页`;
}

// 检查钓鱼邮件
function checkPhishing() {
    let result = "结果：\n";
    const start = (currentPage - 1) * emailsPerPage;
    const end = start + emailsPerPage;

    for (let i = start; i < end; i++) {
        const isChecked = document.getElementById(`email${i}`).checked;
        const isPhishing = emails[i].isPhishing;

        if (isChecked && isPhishing) {
            result += `正确：邮件${i + 1}是钓鱼邮件。\n`;
        } else if (isChecked && !isPhishing) {
            result += `错误：邮件${i + 1}不是钓鱼邮件。\n`;
        } else if (!isChecked && isPhishing) {
            result += `错误：邮件${i + 1}是钓鱼邮件，但未被勾选。\n`;
        } else {
            result += `正确：邮件${i + 1}不是钓鱼邮件。\n`;
        }
    }

    document.getElementById("phishingResult").innerText = result;
}

// 处理分页逻辑
function goToPage(page) {
    if (page < 1 || page > Math.ceil(emails.length / emailsPerPage)) return;
    currentPage = page;
    showEmails(currentPage);
}

// 添加事件监听器
document.getElementById("prevPage").addEventListener("click", function() {
    goToPage(currentPage - 1);
});
document.getElementById("nextPage").addEventListener("click", function() {
    goToPage(currentPage + 1);
});
document.getElementById("checkPhishing").addEventListener("click", checkPhishing);

// 初始显示第一页的邮件
showEmails(currentPage);


// 社交工程场景数据（每个场景包含多个对话，每个对话有文本、选项和反馈）
const scenarios = [
    {
        dialogues: [
            {
                text: "场景1：您接到一个自称是银行客服的电话，对方要求您提供账户信息进行身份验证。",
                choices: [
                    {text: "提供账户信息", feedback: "错误：永远不要在未经核实的电话中提供敏感信息。"},
                    {text: "拒绝并挂断电话", feedback: "正确：挂断电话并通过官方渠道联系银行确认。"}
                ]
            },
            {
                text: "对方：为了确保您的账户安全，请提供您的账户号码。",
                choices: [
                    {text: "提供账户号码", feedback: "错误：不要在未经核实的电话中泄露账户号码。"},
                    {text: "再次拒绝并挂断电话", feedback: "正确：挂断电话并联系银行核实信息。"}
                ]
            },
            {
                text: "对方：如果您不提供信息，我们将冻结您的账户。",
                choices: [
                    {text: "继续提供信息", feedback: "错误：这是典型的恐吓手法，立即挂断电话。"},
                    {text: "果断挂断电话并直接联系银行", feedback: "正确：通过官方渠道联系银行确认。"}
                ]
            }
        ]
    },
    {
        dialogues: [
            {
                text: "场景2：您收到一封来自朋友的电子邮件，要求您点击链接查看照片。",
                choices: [
                    {text: "点击链接查看照片", feedback: "错误：不要轻易点击不明链接，可能是钓鱼攻击。"},
                    {text: "联系朋友确认链接的真实性", feedback: "正确：在点击之前先确认链接是否真实。"}
                ]
            },
            {
                text: "您：这真的是你发的吗？",
                choices: [
                    {text: "点击链接", feedback: "错误：在确认前点击链接可能会导致安全问题。"},
                    {text: "等朋友确认后再操作", feedback: "正确：等待朋友确认后再采取行动。"}
                ]
            }
        ]
    },
    {
        dialogues: [
            {
                text: "场景3：您接到一个自称是公司IT部门的电话，要求您提供登录密码以修复账户问题。",
                choices: [
                    {text: "提供密码", feedback: "错误：不要在电话中泄露密码，应通过官方渠道核实。"},
                    {text: "拒绝并告知会联系公司IT部门核实", feedback: "正确：挂断电话并通过公司内部渠道确认。"}
                ]
            },
            {
                text: "对方：如果您不提供，我们将无法修复问题。",
                choices: [
                    {text: "提供密码", feedback: "错误：不论对方如何威胁，都不要提供密码。"},
                    {text: "挂断电话并联系公司核实", feedback: "正确：这是正确的应对方式，避免泄露敏感信息。"}
                ]
            }
        ]
    },
    // 其他场景数据类似，可以继续添加更多场景
];

// 当前显示的场景和对话索引
let currentScenarioIndex = 0;
let currentDialogueIndex = 0;

// 显示对话
function showDialogue(scenarioIndex, dialogueIndex) {
    const scenario = scenarios[scenarioIndex];
    const dialogue = scenario.dialogues[dialogueIndex];

    document.getElementById("scenarioText").innerText = dialogue.text;

    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = ""; // 清空之前的选项

    dialogue.choices.forEach((choice, index) => {
        const choiceButton = document.createElement("button");
        choiceButton.innerText = choice.text;
        choiceButton.addEventListener("click", function() {
            document.getElementById("feedbackText").innerText = choice.feedback;
        });
        choicesDiv.appendChild(choiceButton);
    });

    // 控制上一对话按钮的显示
    document.getElementById("prevDialogue").style.display = dialogueIndex > 0 ? "inline" : "none";
}

// 切换到下一个对话
function nextDialogue() {
    if (currentDialogueIndex < scenarios[currentScenarioIndex].dialogues.length - 1) {
        currentDialogueIndex++;
        document.getElementById("feedbackText").innerText = ""; // 清空之前的反馈
        showDialogue(currentScenarioIndex, currentDialogueIndex);
    } else {
        if (currentScenarioIndex < scenarios.length - 1) {
            currentScenarioIndex++;
            currentDialogueIndex = 0;
            document.getElementById("feedbackText").innerText = ""; // 清空之前的反馈
            showDialogue(currentScenarioIndex, currentDialogueIndex);
        } else {
            alert("所有场景已完成！");
            // 返回目录或执行其他操作
        }
    }
}

// 切换到上一个对话
function prevDialogue() {
    if (currentDialogueIndex > 0) {
        currentDialogueIndex--;
        document.getElementById("feedbackText").innerText = ""; // 清空之前的反馈
        showDialogue(currentScenarioIndex, currentDialogueIndex);
    }
}

// 添加事件监听器
document.getElementById("nextDialogue").addEventListener("click", nextDialogue);
document.getElementById("prevDialogue").addEventListener("click", prevDialogue);

// 初始显示第一个场景的第一个对话
showDialogue(currentScenarioIndex, currentDialogueIndex);

import {sleep} from '../helpers/document-helpers';

const PLACEHOLDER_DOTS_COUNT = 3;
const CORRECT_ANSWER_ODDS = 0.5;

const Timeout = {
  ANSWER_PLACEHOLDER: 700,
  ANSWER: 700,
  PLACEHOLDER_REMOVAL: 400,
};

const renderQuestionText = (messageText) => {
  const questionText = document.createElement(`p`);

  questionText.innerText = messageText;

  return questionText;
};

const renderQuestion = (questionText) => {
  const text = renderQuestionText(questionText);

  const item = document.createElement(`li`);
  item.classList.add(`chat__message`, `chat__message--outcoming`);
  item.append(text);

  return {
    item,
    text,
  };
};

const renderPlaceholder = () => {
  const placeholder = document.createElement(`div`);
  placeholder.classList.add(`chat__placeholder`);

  for (let i = 0; i < PLACEHOLDER_DOTS_COUNT; i++) {
    const dot = document.createElement(`span`);
    placeholder.append(dot);
  }

  return placeholder;
};

const renderAnswerText = (isCorrect) => {
  const answerText = document.createElement(`p`);
  answerText.classList.add(`hidden`);

  answerText.innerText = isCorrect ? `Да` : `Нет`;

  return answerText;
};

const renderAnswer = (isCorrect) => {
  const placeholder = renderPlaceholder();
  const text = renderAnswerText(isCorrect);

  const item = document.createElement(`li`);
  item.classList.add(`chat__message`, `chat__message--incoming`);
  item.append(placeholder, text);

  return {
    item,
    placeholder,
    text,
  };
};

const revealAnswer = (answer) => {
  answer.placeholder.classList.add(`chat__placeholder--hidden`);

  answer.text.classList.remove(`hidden`);
};

const removePlaceholder = (answer) => {
  answer.placeholder.remove();
  delete answer.placeholder;
};

export default () => {
  const messageForm = document.getElementById(`message-form`);
  const messageField = document.getElementById(`message-field`);
  const messageList = document.getElementById(`messages`);
  const chatBlock = document.querySelector(`.js-chat`);

  const addMessage = (message) => {
    messageList.append(message);

    if (messageList.scrollHeight > chatBlock.offsetHeight) {
      chatBlock.scrollTop = messageList.scrollHeight;
    }
  };

  const submitQuestion = async () => {
    if (messageField.value) {
      const messageText = messageField.value;
      messageField.value = ``;
      messageField.disabled = true;

      const question = renderQuestion(messageText);
      addMessage(question.item);

      await sleep(Timeout.ANSWER_PLACEHOLDER);
      const answer = renderAnswer(Math.random() <= CORRECT_ANSWER_ODDS);
      addMessage(answer.item);

      await sleep(Timeout.ANSWER);
      revealAnswer(answer);

      messageField.disabled = false;
      messageField.focus();

      await sleep(Timeout.PLACEHOLDER_REMOVAL);
      removePlaceholder(answer);
    }
  };

  messageForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    submitQuestion();
  });
};

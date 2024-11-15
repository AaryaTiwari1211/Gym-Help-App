# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from langchain_google_genai import ChatGoogleGenerativeAI
from .serializers import ChatbotRequestSerializer

# Initialize the chatbot model
import os
from dotenv import load_dotenv

load_dotenv()

google_api_key = os.getenv("GOOGLE_API_KEY")
llm = ChatGoogleGenerativeAI(
    model="gemini-pro", temperature=0.4, google_api_key=google_api_key
)
conversation_history = ""


def generate_health_chatbot_response(user_question):
    global conversation_history
    prompt = (
        f"You are a health chatbot. You have to answer health-related concerns.\n"
        f"This is the user question: *{user_question}*\n"
        f"This is the conversation history for reference:\n{conversation_history}\n"
        f"Chatbot:"
    )

    response = llm.predict(prompt)

    if response:
        conversation_history += f"User: {user_question}\n"
        conversation_history += f"Chatbot: {response}\n"
    else:
        response = "I'm sorry, but I couldn't provide an answer at this moment."

    return response


class ChatbotAPIView(APIView):
    def post(self, request):
        serializer = ChatbotRequestSerializer(data=request.data)
        if serializer.is_valid():
            user_question = serializer.validated_data["question"]
            response = generate_health_chatbot_response(user_question)
            return Response({"response": response}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

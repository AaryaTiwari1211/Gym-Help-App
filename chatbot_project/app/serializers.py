# serializers.py
from rest_framework import serializers


class ChatbotRequestSerializer(serializers.Serializer):
    question = serializers.CharField(required=True)

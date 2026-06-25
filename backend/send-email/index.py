import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта на почту medtehremont@yandex.ru"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    device = body.get('device', '').strip()
    message = body.get('message', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и телефон обязательны'}),
        }

    smtp_password = os.environ['SMTP_PASSWORD']
    sender = 'medtehremont@yandex.ru'
    recipient = 'medtehremont@yandex.ru'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка на ремонт от {name}'
    msg['From'] = sender
    msg['To'] = recipient

    html = f"""
    <html><body style="font-family: Arial, sans-serif; color: #1a2a3a;">
      <h2 style="color: #0f3460;">Новая заявка с сайта МедТехРемонт</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
        <tr><td style="padding: 8px 12px; background: #f0f4f8; font-weight: bold;">Имя</td>
            <td style="padding: 8px 12px;">{name}</td></tr>
        <tr><td style="padding: 8px 12px; background: #f0f4f8; font-weight: bold;">Телефон</td>
            <td style="padding: 8px 12px;">{phone}</td></tr>
        <tr><td style="padding: 8px 12px; background: #f0f4f8; font-weight: bold;">Оборудование</td>
            <td style="padding: 8px 12px;">{device or '—'}</td></tr>
        <tr><td style="padding: 8px 12px; background: #f0f4f8; font-weight: bold;">Описание</td>
            <td style="padding: 8px 12px;">{message or '—'}</td></tr>
      </table>
    </body></html>
    """

    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as server:
        server.login(sender, smtp_password)
        server.sendmail(sender, recipient, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True}),
    }

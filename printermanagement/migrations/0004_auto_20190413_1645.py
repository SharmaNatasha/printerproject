# Generated by Django 2.1.7 on 2019-04-13 11:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('printermanagement', '0003_auto_20190331_2153'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='company',
            field=models.IntegerField(choices=[(1, 'Not relevant'), (2, 'Review'), (3, 'Maybe relevant'), (4, 'Relevant'), (5, 'Leading candidate')], default=1),
        ),
        migrations.AlterField(
            model_name='company',
            name='issue',
            field=models.IntegerField(choices=[(1, 'Not relevant'), (2, 'Review'), (3, 'Maybe relevant'), (4, 'Relevant'), (5, 'Leading candidate')], default=1),
        ),
        migrations.AlterField(
            model_name='company',
            name='printer',
            field=models.IntegerField(choices=[(1, 'Not relevant'), (2, 'Review'), (3, 'Maybe relevant'), (4, 'Relevant'), (5, 'Leading candidate')], default=1),
        ),
    ]

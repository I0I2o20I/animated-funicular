from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class ModelTests(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Test Team')
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass', team=self.team)
        self.activity = Activity.objects.create(user=self.user, activity_type='Running', duration=30)
        self.leaderboard = Leaderboard.objects.create(user=self.user, points=100)
        self.workout = Workout.objects.create(name='Test Workout', description='Test Desc')
        self.workout.users.add(self.user)

    def test_team(self):
        self.assertEqual(self.team.name, 'Test Team')

    def test_user(self):
        self.assertEqual(self.user.email, 'test@example.com')
        self.assertEqual(self.user.team, self.team)

    def test_activity(self):
        self.assertEqual(self.activity.activity_type, 'Running')

    def test_leaderboard(self):
        self.assertEqual(self.leaderboard.points, 100)

    def test_workout(self):
        self.assertEqual(self.workout.name, 'Test Workout')
        self.assertIn(self.user, self.workout.users.all())

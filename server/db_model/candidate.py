from flask_login import UserMixin
from sqlalchemy.dialects.postgresql import UUID
import uuid


def init_candidate_model(db):
    class Candidate(db.Model, UserMixin):
        """
        Postgres table schema
        """

        id = db.Column(
            db.String(80),
            primary_key=True,
            default=str(uuid.uuid4()),
            unique=True,
            nullable=False,
        )
        user_id = db.Column(
            db.String(80),
            db.ForeignKey("user.id"),
            nullable=False,
        )
        password = db.Column(
            db.String(128), nullable=False
        )  # Store the hashed password
        email = db.Column(db.String(120), unique=True, nullable=False)
        associations = db.Column(db.ARRAY(db.String), nullable=False)
        first_name = db.Column(db.String(80))  # First name as a string
        last_name = db.Column(db.String(80))  # Last name as a string
        preferred_name = db.Column(db.String(80))  # Preferred name as a string
        city = db.Column(db.String(80))  # City as a string
        country = db.Column(db.String(80))  # Country as a string
        cv_reference = db.Column(db.String(256))  # CV reference as a string
        address = db.Column(db.String(256))  # Address as a string
        phone_number = db.Column(db.String(20))  # Phone number as a string
        birth_date = db.Column(db.Date)  # Birth date as a date
        work_permit = db.Column(db.String(80))  # Work permit as a string
        notice_period = db.Column(db.String(80))  # Notice period as a string
        job_status = db.Column(db.String(256))  # Job status as a string
        preferred_jobs = db.Column(db.JSON)  # Type of job you're looking for as JSON
        company_type = db.Column(
            db.ARRAY(db.String)
        )  # Type of company as an JSN of strings
        matching_jobs = db.Column(
            db.JSON
        )  # Matching jobs as an JSON of foreign keys (integer)
        matching_companies = db.Column(
            db.JSON
        )  # Matching companies as an array of foreign keys (integer)
        values = db.Column(db.ARRAY(db.String))  # Values as an array of strings
        skills = db.Column(
            db.JSON
        )  # Hard Skills as e.g [{'skill_name': 'React', 'skill_id': 'React', 'score': 20, 'skill_level': 'intermediate'}]
        soft_skills = db.Column(
            db.ARRAY(db.String)
        )  # Soft Skills as an array of strings
        languages = db.Column(db.JSON)  # Languages as a JSON array of objects
        links = db.Column(db.JSON)  # Links as a JSON array of objects
        certificates = db.Column(db.JSON)  # Certificates as a JSON array of objects
        visible_information = db.Column(
            db.ARRAY(db.String)
        )  # Visible information as an array of strings e.g ['Salary range', 'Visa status']
        experience = db.Column(
            db.JSON
        )  # Experience as e.g [{'industries': 'IT', 'role': 'Software engineer', 'years_of_experience': 3}]
        visa_status = db.Column(
            db.ARRAY(db.String)
        )  # Visa status as an array of strings e.g ['EU citizen', 'Work permit']
        salary_expectation = db.Column(
            db.ARRAY(db.String)
        )  # Salary expectation as an array of strings e.g ['50k', '70k']
        possible_work_locations = db.Column(
            db.ARRAY(db.String)
        )  # Possible work locations as an array of strings e.g ['Amsterdam', 'Rotterdam']
        type_of_work = db.Column(db.ARRAY(db.String)) # Type of work as an array of strings e.g ['Hybrid', 'Remote', 'Office']

        def __init__(
            self,
            user_id,
            password,
            email,
            associations,
            first_name=None,
            last_name=None,
            city=None,
            country=None,
            preferred_name=None,
            cv_reference=None,
            values=None,
            preferred_jobs=None,
            address=None,
            phone_number=None,
            birth_date=None,
            work_permit=None,
            notice_period=None,
            job_status=None,
            company_type=None,
            matching_jobs=None,
            matching_companies=None,
            skills=None,
            soft_skills=None,
            languages=None,
            links=None,
            certificates=None,
            visible_information=None,
            experience=None,
            visa_status=None,
            salary_expectation=None,
            possible_work_locations=None,
            type_of_work=None,
        ):
            """
            Initialize a new candidate object.

            Args:
                # Your additional fields here
            """
            self.user_id = user_id
            self.password = password
            self.email = email
            self.associations = associations
            self.first_name = first_name
            self.last_name = last_name
            self.city = city
            self.country = country
            self.preferred_name = preferred_name
            self.cv_reference = cv_reference
            self.values = values
            self.preferred_jobs = preferred_jobs
            self.address = address
            self.phone_number = phone_number
            self.birth_date = birth_date
            self.work_permit = work_permit
            self.notice_period = notice_period
            self.job_status = job_status
            self.company_type = company_type
            self.matching_jobs = matching_jobs
            self.matching_companies = matching_companies
            self.skills = skills
            self.soft_skills = soft_skills
            self.languages = languages
            self.links = links
            self.certificates = certificates
            self.visible_information = visible_information
            self.experience = experience
            self.visa_status = visa_status
            self.salary_expectation = salary_expectation
            self.possible_work_locations = possible_work_locations
            self.type_of_work = type_of_work

        def to_dict(self):
            """
            Convert the candidate object to a dictionary.
            """
            return {
                "id": self.id,
                "user_id": self.user_id,
                "email": self.email,
                "associations": self.associations,
                "first_name": self.first_name,
                "last_name": self.last_name,
                "city": self.city,
                "country": self.country,
                "preferred_name": self.preferred_name,
                "cv_reference": self.cv_reference,
                "values": self.values,
                "preferred_jobs": self.preferred_jobs,
                "address": self.address,
                "phone_number": self.phone_number,
                "birth_date": self.birth_date.isoformat() if self.birth_date else None,
                "work_permit": self.work_permit,
                "notice_period": self.notice_period,
                "job_status": self.job_status,
                "company_type": self.company_type,
                "matching_jobs": self.matching_jobs,
                "matching_companies": self.matching_companies,
                "skills": self.skills,
                "soft_skills": self.soft_skills,
                "languages": self.languages,
                "links": self.links,
                "certificates": self.certificates,
                "visible_information": self.visible_information,
                "experience": self.experience,
                "visa_status": self.visa_status,
                "salary_expectation": self.salary_expectation,
                "possible_work_locations": self.possible_work_locations,
                "type_of_work": self.type_of_work,
            }

    return Candidate

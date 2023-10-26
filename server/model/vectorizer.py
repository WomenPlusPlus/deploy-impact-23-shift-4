import string
import os
import requests
from sklearn.feature_extraction.text import TfidfVectorizer
import dill


def tokens(skill):
    global init_list
    init_list = skill.lower().split(" ")
    if len(init_list) > 1:
        init_list.append("_".join(skill.lower().split(" ")))

    final_list = [
        token
        for token in init_list
        if token not in string.punctuation and not token.isnumeric()
    ]

    return final_list


if __name__ == "__main__":
    domain_name = os.environ.get("DOMAIN_NAME")

    skills = requests.get(f"{domain_name}/api/get_all_skills")

    skills = [skill["name"] for skill in skills.json()["skills"]]

    vectorizer = TfidfVectorizer(tokenizer=tokens, token_pattern=None)

    tfidf = vectorizer.fit_transform(skills)
    file_path = os.path.dirname(__file__)

    with open(f"{file_path}/vectorizer.pkl", "wb") as file:
        dill.dump(vectorizer, file)

import string
import os
import requests
from sklearn.feature_extraction.text import TfidfVectorizer
import dill

def tokens(skill):
  init_list = skill.lower().split(' ')
  if len(init_list) > 1:
    init_list.append('_'.join(skill.lower().split(" ")))

  final_list = [token for token in init_list if token not in string.punctuation and not token.isnumeric()]
    # print(final_list)
  return final_list

if __name__ == '__main__':
    skills = requests.get('http://localhost:5001/api/get_all_skills')

    skills = [skill['name'] for skill in skills.json()['skills']]

    vectorizer = TfidfVectorizer(tokenizer=tokens)

    tfidf = vectorizer.fit_transform(skills)
    file_path = (os.path.dirname(__file__))

    # print(file_path)
    # path = 

    with open(f'{file_path}/vectorizer.pkl','wb') as file:
        dill.dump(vectorizer, file)
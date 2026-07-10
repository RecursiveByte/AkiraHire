from fastapi import HTTPException
from pydantic import  ValidationError

def validate_model(model_cls, **data):
    try:
        return model_cls(**data)
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=e.errors())
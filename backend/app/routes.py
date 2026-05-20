from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas import (
    TicketCreate,
    TicketUpdate,
    TicketResponse
)
from app.crud import (
    create_ticket,
    get_all_tickets,
    get_ticket_by_id,
    update_ticket
)

router = APIRouter()


@router.post("/tickets", response_model=TicketResponse)
def create_new_ticket(
    ticket: TicketCreate,
    db: Session = Depends(get_db)
):
    return create_ticket(db, ticket)


@router.get("/tickets", response_model=List[TicketResponse])
def fetch_tickets(
    status: str = None,
    search: str = None,
    db: Session = Depends(get_db)
):
    return get_all_tickets(db, status, search)


@router.get("/tickets/{ticket_id}", response_model=TicketResponse)
def fetch_ticket(
    ticket_id: str,
    db: Session = Depends(get_db)
):
    ticket = get_ticket_by_id(db, ticket_id)

    if not ticket:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    return ticket


@router.put("/tickets/{ticket_id}")
def edit_ticket(
    ticket_id: str,
    ticket_update: TicketUpdate,
    db: Session = Depends(get_db)
):
    ticket = update_ticket(
        db,
        ticket_id,
        ticket_update
    )

    if not ticket:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    return {
        "success": True,
        "updated_at": ticket.updated_at
    }
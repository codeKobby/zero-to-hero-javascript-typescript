// Day 45 - Capstone planner. Replace this small planner with your own app.
const STORAGE_KEY = 'day45-capstone-plan'
const state = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{"title":"My capstone","milestones":[]}')
const root = document.querySelector('#app')
if (!(root instanceof HTMLElement)) throw new Error('Missing #app')
root.innerHTML = '<h1>Capstone planner</h1><p>Plan the smallest useful version before you build it.</p><form id="plan"><label>Project title <input id="title" required></label><label>Milestone <input id="milestone" required></label><button>Add milestone</button></form><h2 id="heading"></h2><ol id="milestones"></ol>'
const title = document.querySelector('#title'); const form = document.querySelector('#plan'); const milestone = document.querySelector('#milestone'); const heading = document.querySelector('#heading'); const list = document.querySelector('#milestones')
if (!(title instanceof HTMLInputElement) || !(form instanceof HTMLFormElement) || !(milestone instanceof HTMLInputElement) || !(heading instanceof HTMLElement) || !(list instanceof HTMLOListElement)) throw new Error('Missing planner controls')
title.value = typeof state.title === 'string' ? state.title : 'My capstone'
function save() { state.title = title.value.trim() || 'My capstone'; localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) }
function render() { heading.textContent = state.title; list.replaceChildren(...state.milestones.map(item => { const li = document.createElement('li'); li.textContent = item; return li })) }
form.addEventListener('submit', event => { event.preventDefault(); const value = milestone.value.trim(); if (!value) return; state.milestones.push(value); milestone.value = ''; save(); render() })
title.addEventListener('input', () => { save(); render() }); render()

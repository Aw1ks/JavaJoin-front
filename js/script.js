var tabsVerticalInner = $('#accordian');
var selectorVerticalInner = $('#accordian').find('li').length;
var activeItemVerticalInner = tabsVerticalInner.find('.active');
var activeWidthVerticalHeight = activeItemVerticalInner.innerHeight();
var activeWidthVerticalWidth = activeItemVerticalInner.innerWidth();
var itemPosVerticalTop = activeItemVerticalInner.position();
var itemPosVerticalLeft = activeItemVerticalInner.position();
$(".selector-active").css({
	"top":itemPosVerticalTop.top + "px", 
	"left":itemPosVerticalLeft.left + "px",
	"height": activeWidthVerticalHeight + "px",
	"width": activeWidthVerticalWidth - "px"
});
$("#accordian").on("click","li",function(e){
	$('#accordian ul li').removeClass("active");
	$(this).addClass('active');
	var activeWidthVerticalHeight = $(this).innerHeight();
	var activeWidthVerticalWidth = $(this).innerWidth();
	var itemPosVerticalTop = $(this).position();
	var itemPosVerticalLeft = $(this).position();
	$(".selector-active").css({
		"top":itemPosVerticalTop.top + "px", 
		"left":itemPosVerticalLeft.left + "px",
		"height": activeWidthVerticalHeight + "px",
		"width": activeWidthVerticalWidth - "px"
	});
});


jQuery(document).ready(function($){
  var path = window.location.pathname.split("/").pop();

  if ( path == '' ) {
    path = 'index.html';
  }

  var target = $('#accordian ul li a[href="'+path+'"]');
  target.parent().addClass('active');
});

// QUANTITY BUTTONS BEHAVIOR
function changeQuantity(button, delta) {
  const quantityControl = button.closest('.quantity-control');
  const input = quantityControl.querySelector('.quantity-input');
  if (!input) return;

  let currentValue = parseInt(input.value) || 1;
  if (delta > 0) {
    input.value = currentValue + 1;
  } else if (currentValue > 1) {
    input.value = currentValue - 1;
  }
}

// TABS 
// AND 
// CONTENT REPLACEMENT
document.addEventListener('DOMContentLoaded', function() {
  const saleCards = document.querySelectorAll('.sale-card');
  
  saleCards.forEach(card => {
    const tabBtns = card.querySelectorAll('.tab-btn');
    const contentDiv = card.querySelector('.sale-card_description');
    const indicator = card.querySelector('.tab-indicator');
    const tabsContainer = card.querySelector('.tabs');
    
    if (!tabBtns.length || !contentDiv || !indicator || !tabsContainer) return;
    
    const tabContents = {
      description: `
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dicta exercitationem culpa blanditiis ab corporis quos vero iste similique nihil.</p>
      `,
      ingredients: `
        <p>
          Свежемолотый кофе, Молоко, Сахар/Сироп
        </p>
      `
    };
    
    function updateIndicator(activeBtn) {
      const rect = activeBtn.getBoundingClientRect();
      const tabsRect = tabsContainer.getBoundingClientRect();
      const newLeft = rect.left - tabsRect.left;
      const newWidth = rect.width;
      
      const currentLeft = parseFloat(indicator.style.left || 0);
      const currentWidth = parseFloat(indicator.style.width || 0);
      
      if (newLeft > currentLeft) {
        indicator.style.width = (newLeft + newWidth - currentLeft) + 'px';
        setTimeout(() => {
          indicator.style.left = newLeft + 'px';
          indicator.style.width = newWidth + 'px';
        }, 400);
      } else if (newLeft < currentLeft) {
        indicator.style.left = newLeft + 'px';
        indicator.style.width = (currentLeft + currentWidth - newLeft) + 'px';
        setTimeout(() => {
          indicator.style.width = newWidth + 'px';
        }, 400);
      } else {
        indicator.style.width = newWidth + 'px';
      }
    }
    
    const initialActive = card.querySelector('.tab-btn.active');
    if (initialActive) {
      const rect = initialActive.getBoundingClientRect();
      const tabsRect = tabsContainer.getBoundingClientRect();
      indicator.style.left = (rect.left - tabsRect.left) + 'px';
      indicator.style.width = rect.width + 'px';
    }
    
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        tabBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        updateIndicator(this);
        
        const tabType = this.getAttribute('data-tab');
        if (tabContents[tabType]) {
          contentDiv.innerHTML = tabContents[tabType];
        }
      });
    });
  });
});

// SCROLL ANIMATIONS
document.addEventListener('DOMContentLoaded', function() {
  const saleCards = document.querySelectorAll('.sale-card');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    saleCards.forEach(card => observer.observe(card));
  } else {
    saleCards.forEach(card => card.style.opacity = '1');
  }
});

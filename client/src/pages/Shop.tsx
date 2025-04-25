import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer';
import { ChevronRight, ShoppingBag, DollarSign, CreditCard, Calendar, ExternalLink, CheckCircle, RefreshCw, FileText } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Shop = () => {
  const [cart, setCart] = useState<{id: number, quantity: number}[]>([]);
  
  // Use React Query to fetch products
  const { data: products, isLoading } = useQuery({
    queryKey: ['/api/products'],
    queryFn: () => fetch('/api/products').then(res => res.json())
  });
  
  const addToCart = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevCart, { id: productId, quantity: 1 }];
      }
    });
  };
  
  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      } else {
        return prevCart.filter(item => item.id !== productId);
      }
    });
  };
  
  const getProductById = (id: number) => {
    return products?.find((product: Product) => product.id === id);
  };
  
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const product = getProductById(item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };
  
  const { toast } = useToast();
  
  // State for checkout step
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'payment' | 'confirmation'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'godaddy' | 'paypal' | 'bank'>('godaddy');
  
  // Predefined products for the lodge
  const lodgeProducts = [
    {
      id: 1,
      name: "Annual Dues",
      description: "Annual membership dues for St. Petersburg Lodge No. 139",
      price: 177.00,
      category: "membership",
      hasSubscription: true,
      imageUrl: "https://images.unsplash.com/photo-1569235186275-626cb53b83ce?q=80&w=1372&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Meal Plan - Annual",
      description: "Pre-pay for all stated meeting meals for the year",
      price: 120.00,
      category: "dining",
      hasSubscription: true,
      imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1160&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Meal Plan - 6 Months",
      description: "Pre-pay for stated meeting meals for six months",
      price: 65.00,
      category: "dining",
      hasSubscription: false,
      imageUrl: "https://images.unsplash.com/photo-1609167830220-7164aa360951?q=80&w=1740&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Make Your Penny Make Sense Donation",
      description: "Donation to support lodge charity initiatives",
      price: 25.00,
      category: "charity",
      hasSubscription: false,
      imageUrl: "https://images.unsplash.com/photo-1589758438368-0ad531db3366?q=80&w=1932&auto=format&fit=crop"
    },
    {
      id: 5,
      name: "Building Fund Donation",
      description: "Support the maintenance and improvement of our historic lodge building",
      price: 50.00,
      category: "building",
      hasSubscription: false,
      imageUrl: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?q=80&w=1738&auto=format&fit=crop"
    }
  ];
  
  // Handling checkout process
  const proceedToPayment = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before proceeding to checkout.",
        variant: "destructive"
      });
      return;
    }
    setCheckoutStep('payment');
  };
  
  const completeCheckout = () => {
    toast({
      title: "Order Placed Successfully!",
      description: "Thank you for your payment. A receipt has been sent to your email.",
      variant: "default"
    });
    setCheckoutStep('confirmation');
    // Clear cart after successful checkout
    setCart([]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Page Header */}
        <div className="bg-primary-blue-dark text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm mb-4">
              <Link to="/">
                <div className="hover:text-primary-gold transition">Home</div>
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary-gold">Lodge Shop</span>
            </div>
            <h1 className="font-cinzel text-4xl md:text-5xl font-bold">Lodge Shop</h1>
          </div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Product List */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="p-6 border-b">
                  <h2 className="font-cinzel text-2xl text-primary-blue font-bold">Lodge Payments & Donations</h2>
                  <p className="text-gray-600 mt-2">Securely pay your dues, purchase meal plans, and make donations to support our lodge.</p>
                </div>
                
                <div className="divide-y">
                  {lodgeProducts.map((product) => (
                    <div key={product.id} className="p-6 flex flex-col md:flex-row">
                      <div className="md:w-1/4 mb-4 md:mb-0">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          className="rounded-lg object-cover w-full h-32"
                        />
                      </div>
                      <div className="md:w-2/4 md:px-6">
                        <h3 className="font-bold text-lg text-primary-blue">{product.name}</h3>
                        <p className="text-gray-600 mt-1">{product.description}</p>
                        <div className="mt-4 flex items-center text-primary-gold font-semibold">
                          <DollarSign className="h-4 w-4 mr-1" />
                          <span>${product.price.toFixed(2)}</span>
                        </div>
                        
                        {product.hasSubscription && (
                          <div className="mt-3 flex items-center text-primary-blue text-sm">
                            <RefreshCw className="h-3 w-3 mr-1" />
                            <span>Recurring payment option available</span>
                          </div>
                        )}
                      </div>
                      <div className="md:w-1/4 flex items-end md:items-center justify-start md:justify-end mt-4 md:mt-0">
                        {product.hasSubscription ? (
                          <div className="w-full">
                            <Button 
                              onClick={() => addToCart(product.id)}
                              className="w-full mb-2 bg-primary-blue hover:bg-primary-blue-dark text-white"
                            >
                              One-time Payment
                            </Button>
                            <Button 
                              onClick={() => {
                                addToCart(product.id);
                                toast({
                                  title: "Subscription Added",
                                  description: "You will be billed annually for this item.",
                                });
                              }}
                              variant="outline"
                              className="w-full text-primary-blue border-primary-blue hover:bg-primary-blue-light"
                            >
                              <RefreshCw className="mr-1 h-3 w-3" />
                              Annual Subscription
                            </Button>
                          </div>
                        ) : (
                          <Button 
                            onClick={() => addToCart(product.id)}
                            className="bg-primary-blue hover:bg-primary-blue-dark text-white"
                          >
                            Add to Cart
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-neutral-light p-6 rounded-lg">
                <h3 className="font-cinzel text-xl text-primary-blue font-bold mb-4">Payment Information</h3>
                <div className="prose prose-sm max-w-none">
                  <p>All payments are processed securely through our payment gateway. You will receive an email receipt for your records once your payment is complete.</p>
                  
                  <h4 className="font-semibold mt-4">Annual Dues</h4>
                  <p>Annual dues are $177.00 and cover your membership from January 1 to December 31. Dues must be paid by December 31 to maintain good standing.</p>
                  
                  <h4 className="font-semibold mt-4">Meal Plans</h4>
                  <p>Our meal plan options provide a convenient way to pre-pay for stated meeting meals. The annual plan covers all 12 stated meetings, while the 6-month plan covers 6 consecutive meetings from your date of purchase.</p>
                  
                  <h4 className="font-semibold mt-4">Donations</h4>
                  <p>All donations to our charitable funds are tax-deductible. You will receive a receipt for your tax records.</p>
                </div>
              </div>
            </div>
            
            {/* Cart and Checkout */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-6">
                {checkoutStep === 'confirmation' ? (
                  <div className="p-6">
                    <div className="text-center py-8">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h2 className="font-cinzel text-2xl text-primary-blue font-bold mb-2">Payment Successful!</h2>
                      <p className="text-gray-600 mb-6">Thank you for your payment. A receipt has been sent to your email.</p>
                      
                      <div className="mb-6 p-4 bg-neutral-light rounded-lg text-left">
                        <h3 className="font-medium mb-2">Order Summary</h3>
                        <p className="text-sm">Order #: WC-{Math.floor(Math.random() * 10000)}</p>
                        <p className="text-sm">Date: {new Date().toLocaleDateString()}</p>
                        <p className="text-sm">Payment method: {paymentMethod === 'godaddy' ? 'GoDaddy Payments' : paymentMethod === 'paypal' ? 'PayPal' : 'Bank Transfer'}</p>
                        <p className="text-sm">Status: Completed</p>
                        
                        {paymentMethod === 'bank' && (
                          <div className="mt-3 p-3 bg-blue-50 text-blue-800 text-xs rounded border border-blue-200">
                            <p className="font-medium">Bank Transfer Instructions</p>
                            <p className="mt-1">Please include your Order # in the memo of your transfer. Transfer details have been sent to your email.</p>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between space-x-3">
                        <Button 
                          onClick={() => setCheckoutStep('cart')}
                          className="bg-primary-blue hover:bg-primary-blue-dark text-white"
                        >
                          Return to Shop
                        </Button>
                        
                        <Button 
                          variant="outline"
                          className="border-primary-blue text-primary-blue"
                          onClick={() => {
                            toast({
                              title: "Receipt Sent",
                              description: "A copy of your receipt has been sent to your email.",
                            });
                          }}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          Send Receipt Again
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Tabs defaultValue="cart" value={checkoutStep}>
                    <div className="border-b">
                      <TabsList className="w-full grid grid-cols-2">
                        <TabsTrigger value="cart" onClick={() => setCheckoutStep('cart')} disabled={checkoutStep === 'payment'}>
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Cart
                        </TabsTrigger>
                        <TabsTrigger value="payment" disabled={checkoutStep === 'cart'}>
                          <CreditCard className="h-4 w-4 mr-2" />
                          Payment
                        </TabsTrigger>
                      </TabsList>
                    </div>
                    
                    <TabsContent value="cart" className="m-0">
                      <div className="p-6 border-b">
                        <div className="flex items-center mb-4">
                          <ShoppingBag className="h-5 w-5 text-primary-gold mr-2" />
                          <h2 className="font-cinzel text-xl text-primary-blue font-bold">Your Cart</h2>
                        </div>
                        
                        {cart.length === 0 ? (
                          <div className="py-6 text-center text-gray-500">
                            <p>Your cart is empty</p>
                            <p className="text-sm mt-2">Add items to proceed to checkout</p>
                          </div>
                        ) : (
                          <div>
                            {cart.map(item => {
                              const product = lodgeProducts.find(p => p.id === item.id);
                              return product ? (
                                <div key={item.id} className="flex justify-between py-3">
                                  <div>
                                    <p className="font-medium">{product.name}</p>
                                    <div className="flex items-center mt-1">
                                      <button 
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-gray-500 hover:text-red-500 text-xs border border-gray-300 rounded-full h-5 w-5 flex items-center justify-center"
                                      >
                                        -
                                      </button>
                                      <span className="mx-2 text-sm">{item.quantity}</span>
                                      <button 
                                        onClick={() => addToCart(item.id)}
                                        className="text-gray-500 hover:text-green-500 text-xs border border-gray-300 rounded-full h-5 w-5 flex items-center justify-center"
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium">${(product.price * item.quantity).toFixed(2)}</p>
                                  </div>
                                </div>
                              ) : null;
                            })}
                            
                            <Separator className="my-4" />
                            
                            <div className="flex justify-between py-2">
                              <span>Subtotal</span>
                              <span className="font-medium">${calculateTotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between py-2">
                              <span>Processing Fee</span>
                              <span className="font-medium">$0.00</span>
                            </div>
                            <div className="flex justify-between py-2 text-lg font-bold">
                              <span>Total</span>
                              <span>${calculateTotal().toFixed(2)}</span>
                            </div>
                            
                            <Button 
                              onClick={proceedToPayment}
                              className="w-full mt-6 bg-primary-gold hover:bg-primary-gold-light text-primary-blue-darker font-semibold"
                            >
                              <CreditCard className="mr-2 h-4 w-4" />
                              Proceed to Checkout
                            </Button>
                            
                            <div className="mt-4 text-center text-xs text-gray-500">
                              <p>Secure payment processing</p>
                              <div className="flex justify-center gap-2 mt-2">
                                <span className="font-medium">We accept:</span>
                                <span>Visa</span>
                                <span>MasterCard</span>
                                <span>Amex</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="payment" className="m-0">
                      <div className="p-6 border-b">
                        <div className="flex items-center mb-4">
                          <CreditCard className="h-5 w-5 text-primary-gold mr-2" />
                          <h2 className="font-cinzel text-xl text-primary-blue font-bold">Payment Method</h2>
                        </div>
                        
                        <RadioGroup defaultValue="godaddy" value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                          <div className="flex items-start space-x-2 mb-4 p-3 border rounded-md hover:bg-neutral-50">
                            <RadioGroupItem value="godaddy" id="godaddy" />
                            <div className="grid gap-1.5 leading-none w-full">
                              <Label htmlFor="godaddy" className="font-medium">GoDaddy Payments</Label>
                              <p className="text-sm text-gray-500">Secure payment via GoDaddy (credit/debit card)</p>
                              <div className="mt-2">
                                <div className="flex flex-wrap gap-2 mt-1">
                                  <div className="p-1 border rounded">
                                    <img src="https://cdn.worldvectorlogo.com/logos/visa-2.svg" alt="Visa" className="h-6 w-10 object-contain" />
                                  </div>
                                  <div className="p-1 border rounded">
                                    <img src="https://cdn.worldvectorlogo.com/logos/mastercard-2.svg" alt="Mastercard" className="h-6 w-10 object-contain" />
                                  </div>
                                  <div className="p-1 border rounded">
                                    <img src="https://cdn.worldvectorlogo.com/logos/american-express-logo.svg" alt="Amex" className="h-6 w-10 object-contain" />
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                  <div className="space-y-2">
                                    <Label htmlFor="card-number">Card Number</Label>
                                    <Input id="card-number" placeholder="•••• •••• •••• ••••" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="card-name">Name on Card</Label>
                                    <Input id="card-name" placeholder="John Doe" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="expiry">Expiry Date</Label>
                                    <Input id="expiry" placeholder="MM/YY" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="cvc">CVC</Label>
                                    <Input id="cvc" placeholder="123" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-2 mb-4 p-3 border rounded-md hover:bg-neutral-50">
                            <RadioGroupItem value="paypal" id="paypal" />
                            <div className="grid gap-1.5 leading-none w-full">
                              <Label htmlFor="paypal" className="font-medium">PayPal</Label>
                              <p className="text-sm text-gray-500">Pay securely via PayPal</p>
                              <div className="mt-2">
                                <div className="p-1 border rounded w-20">
                                  <img src="https://cdn.worldvectorlogo.com/logos/paypal-2.svg" alt="PayPal" className="h-6 w-full object-contain" />
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-2 p-3 border rounded-md hover:bg-neutral-50">
                            <RadioGroupItem value="bank" id="bank" />
                            <div className="grid gap-1.5 leading-none">
                              <Label htmlFor="bank" className="font-medium">Bank Transfer</Label>
                              <p className="text-sm text-gray-500">Direct transfer to lodge bank account</p>
                              <p className="text-xs text-gray-400 mt-1">Instructions will be sent to your email</p>
                            </div>
                          </div>
                        </RadioGroup>
                        
                        <Separator className="my-4" />
                        
                        <div className="flex justify-between py-2 text-lg font-bold">
                          <span>Total to Pay</span>
                          <span>${calculateTotal().toFixed(2)}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <Button 
                            onClick={() => setCheckoutStep('cart')}
                            variant="outline"
                            className="w-full"
                          >
                            Back to Cart
                          </Button>
                          
                          <Button 
                            onClick={completeCheckout}
                            className="w-full bg-primary-gold hover:bg-primary-gold-light text-primary-blue-darker font-semibold"
                          >
                            Complete Payment
                          </Button>
                        </div>
                        
                        <div className="mt-4 text-center text-xs text-gray-500">
                          <p className="flex items-center justify-center">
                            <FileText className="h-3 w-3 mr-1" />
                            Payment is processed securely
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
                
                <div className="bg-neutral-light p-4">
                  <h3 className="font-medium mb-2">Need assistance?</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    For payment questions, please contact our Secretary or Treasurer.
                  </p>
                  <Link to="/contact">
                    <div className="text-primary-blue hover:text-primary-gold transition text-sm font-medium flex items-center">
                      <span>Contact Lodge Officers</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;